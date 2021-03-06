const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

require('./db.js');
require('./auth');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Catalog = mongoose.model('Catalog');

//class for each new Food entry
class Food {
	constructor(name, time, price, cals) {
		this.name = name;
		this.time = time;
		this.price = price;
		this.cals = cals;
	}
}

//serve static files
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

//view engine setup
app.set('view engine', 'hbs');

//body-parser
app.use(express.urlencoded({extended: false}));

//enable sessions
const sessionOptions = {
	secret: "secret for signing session id",
	saveUninitialized: false,
	resave: false
};
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
	if (req.session.catalog === undefined) {
		req.session.catalog = {};
		req.session.isNewEntry = false;
	}
	next();
});

app.use(function(req, res, next){
	res.locals.user = req.user;
	next();
});

app.get('/', function(req, res) {
	res.redirect('/register');
})

app.get('/login', function(req, res) {
	//if logged in already, go to goals
	if (req.user) {
		res.redirect('/goals');
	} else {
		res.render('login');
	}
});

app.post('/login', function(req, res) {
	//passport authentication (login)
	passport.authenticate('local', function(err,user) {
    if(user) {
      req.logIn(user, function(err) {
        res.redirect('/goals');
      });
    } else {
      	res.render('login', {message:'Your login or password is incorrect.'});
    }
  })(req, res);
});

app.get('/register', function(req, res) {
	if (req.user) {
		res.redirect('/goals');
	} else {
		res.render('register');
	}
});

app.post('/register', function(req, res) {
	User.find({username: req.body.username}, (err, result) => {
		if (result.length > 0) {
			console.log("USERNAME ALREADY EXISTS");
			res.render('register', {message: "USERNAME ALREADY EXISTS"});
		} 
		else if (req.body.username.length < 8 || req.body.password.length < 8) {
			res.render('register', {message: "Username or Password to Short"})
		} else {
			User.register(new User({username:req.body.username}), 
		      req.body.password, function(err, user){
		    	if (err) {
		      		res.render('register',{message:'Your registration information is not valid'});
		    	} else {
		      		passport.authenticate('local')(req, res, function() {
		        		res.redirect('/goals');
		      		});
		  	  	}
		  	});
		}
	});

	
});

app.get('/goals', function(req, res) {
	if (!req.user) {
		res.redirect('/login');
	} else if (req.query.update) {
		res.render("goals", {"calcBMR" : true});
	} else if (req.query.weight) {
			let bmr = 0;
			if (req.query.gender === "male") {
				bmr = Math.round(66 + (6.23 * req.query.weight) + (12.7 * req.query.height) - (6.8 * req.query.age));
			}
			else {
				bmr = Math.round(655 + (4.35 * req.query.weight) + (4.7 * req.query.height) - (4.7 * req.query.age));
			}
			console.log("bmr: " +  bmr);
			let maint = 0;
			if (req.query.life === "sedentary") {
				maint = bmr * 1.2
			} else if (req.query.life === "slight") {
				maint = bmr * 1.375;
			} else if (req.query.life === "moderate") {
				maint = bmr * 1.55;
			} else if (req.query.life === "active") {
				maint = bmr * 1.725;
			} else if (req.query.life === "very") {
				maint = bmr * 1.9;
			}
			console.log("to maintain: " + maint);
			maint = Math.round(maint);
			req.user.myBMR = bmr;
			req.user.myMaint = maint;
			req.user.myWeight = req.query.weight;
			req.user.save();
			res.render("goals", {"mybmr": bmr, "mymaint" : maint, "mylose" : maint - 500, "mygain" : maint + 500});
	} else {
		//upload current catalog, otherwise ask for new entry
		const obj = req.user.catalogs[req.user.catalogs.length-1];
		if (obj === undefined) {
			res.render('goals', {"calcBMR" : true});
		} else if (obj.completed) {
			//send in req.user.myBMR and mymaint, have link that renders goals with calcBMR to true
			res.render("goals", {"mybmr": req.user.myBMR, "mymaint" : req.user.myMaint, 
				"mylose" : req.user.myMaint - 500, "mygain" : req.user.myMaint + 500});
		} else {
			req.session.catalog = obj;
			res.redirect('/home');
		}
	}
	

});

app.post('/goals', function(req, res) {
	new Catalog({
		date: req.body.date,
		calGoal: Number(req.body.cal),
		monGoal: Number(req.body.mon),
		curCal: 0,
		curMon: 0,
		completed: false,
		weight: req.user.myWeight
	}).save( (err, cat) => {
		//console.log(err);
		req.session.catalog = cat;
		req.user.catalogs.push(cat);
		req.user.save();
		res.redirect('/home')
	});
});

app.get('/home', function(req, res) {
	if (!req.user) {
		res.redirect('/login');
	} else {
		res.render('home', {"todayCat": req.session.catalog,
		"foods": req.session.catalog.foods, "newFood": req.session.isNewEntry});
		req.session.isNewEntry = false;
	}
});

app.post('/home', function (req, res) {
	//mark latest catalog as completed
	req.user.catalogs[req.user.catalogs.length-1].completed = true;
	req.user.save();
	res.redirect('/goals');
});

app.get('/add', function(req, res) {
	if (!req.user) {
		res.redirect('/login');
	} else {
		res.render('add');
	}
});

app.post('/add', function(req, res) {
	//add new food item to the session and user
	const f = new Food (req.body.name, req.body.time+":00", req.body.price, req.body.cals);
	req.session.catalog.foods.push(f);
	req.session.catalog.curCal += Number(req.body.cals);
	req.session.catalog.curMon += Number(req.body.price);
	//update user's catalog
	req.user.catalogs[req.user.catalogs.length-1].foods.push(f);
	req.user.catalogs[req.user.catalogs.length-1].curMon +=  Number(f.price);
	req.user.catalogs[req.user.catalogs.length-1].curCal +=  Number(f.cals);
	req.user.save();

	req.session.isNewEntry = true;
	res.redirect('/home');
});

app.get('/lookup', function (req, res) {
	if (!req.user) {
		res.redirect('/login');
	} else if (req.query.recent) {
		const cats = req.user.catalogs;
		const x = cats[cats.length-2];
		res.render('lookup', {'date': x.date, 'result': x, 'myweight' : x.weight});
	}
	else {
		res.render('lookup', {'searching' : true});
	}
});

app.post('/lookup', function (req, res) {
	const cats = req.user.catalogs;
	//filter user's catalogs for specific date entry
	const result = cats.filter(x => {
		//filter by date specified
		const date = {
			year: x.date.slice(0, 4),
			month: x.date.slice(5, 7),
			day: x.date.slice(8)
		}
		if (date.year === req.body.year) {
			if (req.body.month !== "" && date.month == parseInt(req.body.month, 10)) {
				if (req.body.day !== "" && date.day == parseInt(req.body.day, 10)) {
					return true;
				}
			}
		}
		return false;
	})[0];
	if (result) {
		res.render('lookup', {'date': result.date, 'result': result, 'searching': true, 'myweight' : result.weight});
	} else {
		res.render('lookup', {'none': "Date Does Not Exist!", 'searching': true});
	}
	
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(process.env.PORT || 3000);


console.log("Connected to server");
