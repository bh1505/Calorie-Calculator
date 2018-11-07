const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcryptjs');

require('./db.js');
const mongoose = require('mongoose');
const User = mongoose.model('User');

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

app.get('/login', function(req, res) {
	res.render('login');
});

app.listen(3000);
console.log("Connected to server");
