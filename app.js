const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
//const jquery = require('jquery');

require('./db.js');
require('./auth');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Catalog = mongoose.model('Catalog');
//const Food = mongoose.model('Food');

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
	}
	next();
});

app.use(function(req, res, next){
	res.locals.user = req.user;
	next();
});

app.get('/', function(req, res) {
	res.redirect('/login');
})

app.get('/login', function(req, res) {
	res.render('login');
});

app.post('/login', function(req, res) {
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
	res.render('register');
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
	//check if currently working on catalog
	//console.log(jquery);
	const obj = req.user.catalogs[req.user.catalogs.length-1];
	if (obj === undefined) {
		res.render('goals');
	} else if (obj.completed) {
		res.render('goals');
	} else {
		req.session.catalog = obj;
		res.redirect('/home');
	}
	
});

app.post('/goals', function(req, res) {
	new Catalog({
		date: req.body.date,
		calGoal: req.body.cal,
		monGoal: req.body.mon,
		curCal: 0,
		curMon: 0,
		completed: false
	}).save( (err, cat) => {
		//console.log(err);
		req.session.catalog = cat;
		req.user.catalogs.push(cat);
		req.user.save();
		res.redirect('/home')
	});
});

app.get('/home', function(req, res) {
	res.render('home', {"todayCat": req.session.catalog,
		"foods": req.session.catalog.foods});
});

app.get('/add', function(req, res) {
	res.render('add');
});

app.post('/add', function(req, res) {
	/*new Food({
		name: req.body.name,
		time: req.body.time,
		price: req.body.price,
		cals: req.body.cals
	}).save( (err, food) => {*/
		//update catalog
		//replace with req.user
		const f = new Food (req.body.name, req.body.time, req.body.price, req.body.cals);
		req.session.catalog.foods.push(f);
		req.session.catalog.curCal += Number(req.body.cals);
		req.session.catalog.curMon += Number(req.body.price);
		//update user's catalog
		req.user.catalogs[req.user.catalogs.length-1].foods.push(f);
		req.user.catalogs[req.user.catalogs.length-1].curMon +=  Number(f.price);
		req.user.catalogs[req.user.catalogs.length-1].curCal +=  Number(f.cals);
		req.user.save();

		/*Catalog.findOne({date: req.session.catalog.date}, (err, cat) => {
			cat.foods.push(f);
			cat.curMon += Number(f.price);
			cat.curCal += Number(f.cals);
			cat.save( function(err, c) {
				console.log(c);
			});
		});*/
		res.redirect('/home');
	//});
});

app.listen(process.env.PORT || 3000);


console.log("Connected to server");
