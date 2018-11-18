const mongoose = require('mongoose');

//schema for new User
const User = new mongoose.Schema({
	username: String,
	//hash: //hash from bcrypt,
	catalog: Object //dictionary like object to store dates mapped to lists of food

});
//schema for new catalog for a specific date
const Catalog = new mongoose.Schema({
	username: String,
	date: String,
	calGoal: Number,
	monGoal: Number, 
	foods: Array
});

mongoose.model("User", User);
mongoose.model("Catalog", Catalog);

// is the environment variable, NODE_ENV, set to PRODUCTION? 
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
	 // if we're in PRODUCTION mode, then read the configration from a file
	 // use blocking file io to do this...
	 const fs = require('fs');
	 const path = require('path');
	 const fn = path.join(__dirname, 'config.json');
	 const data = fs.readFileSync(fn);

	 // our configuration file will be in json, so parse it and set the
	 // conenction string appropriately!
	 const conf = JSON.parse(data);
	 dbconf = conf.dbconf;
} else {
	 // if we're not in PRODUCTION mode, then use
	 dbconf = 'mongodb://localhost/bh1505';
}

mongoose.connect(dbconf, {useNewUrlParser: true});


