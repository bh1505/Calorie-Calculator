const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

require('./db.js');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Catalog = mongoose.model('Catalog');

//let todayCat = {};

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

//create Food entries and add to catalog
class Food {
	constructor (name, time, price, cals) {
		this.name = name;
		this.time = time;
		this.price = price;
		this.cals = cals;
	}
}

app.use("/goals", function(req, res, next) {
	if (req.session.catalog === undefined) {
		req.session.catalog = {};
	}
	next();
});

app.get('/goals', function(req, res) {
	res.render('goals');
});

app.post('/goals', function(req, res) {
	new Catalog({
		date: req.body.date,
		calGoal: req.body.cal,
		monGoal: req.body.mon
	}).save( (err, cat) => {
		//console.log(err);
		req.session.catalog = cat;
		res.redirect('/home')
	});
});

app.get('/home', function(req, res) {
	res.render('home', {"todayCat": req.session.catalog});
});

app.listen(3000);

console.log("Connected to server");
