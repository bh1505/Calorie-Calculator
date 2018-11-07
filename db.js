const mongoose = require('mongoose');

//schema for new User
const User = new mongoose.Schema({
	username: String,
	hash: //hash from bcrypt,
	catalog: Object //dictionary like object to store dates mapped to lists of food

});

mongoose.model("User", User);

mongoose.connect('mongodb://localhost/db', {useNewUrlParser: true});