const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

require('./db.js');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Catalog = mongoose.model('Catalog');
const Food = mongoose.model('Food');

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
		monGoal: req.body.mon,
		curCal: 0,
		curMon: 0
	}).save( (err, cat) => {
		//console.log(err);
		req.session.catalog = cat;
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
	new Food({
		name: req.body.name,
		time: req.body.time,
		price: req.body.price,
		cals: req.body.cals
	}).save( (err, food) => {
		req.session.catalog.foods.push(food);
		req.session.catalog.curCal += Number(req.body.cals);
		req.session.catalog.curMon += Number(req.body.price);
		//update catalog
		Catalog.findOne({date: req.session.catalog.date}, (err, cat) => {
			cat.foods.push(food);
			cat.save( function(err, c) {
				console.log(c);
			});
		});
		res.redirect('/home');
	});
});

app.listen(3000);

console.log("Connected to server");
