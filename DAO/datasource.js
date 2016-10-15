var mongo = require('mongo-wrapper');

//var ds = new DataSource();

function DataSource () {

	this.db;

	/*var MongoClient = require('mongodb').MongoClient
	  , assert = require('assert');

	MongoClient.connect('mongodb://localhost:27017/tttracker', (err, database) => {
	  assert.equal(null, err);
	  console.log("Connected correctly to server");
	  this.db = database;
	});*/

	var config = {
	  hosts: [ 
	    {name: 'localhost', port: 27017}, 
	  ],
	  database: 'tttracker',
	  options: {

	  },
	  indexes: {
	    users: [
	      {index: 'username', options: {unique: true}}
	    ],
	    websites: [
	      {index: 'domain', options: {unique: true}}
	    ],
	    actions: [
	      {index: 'uuid', options: {unique: false}}
	    ],	    
	  }
	};
	 
	this.db = mongo.setup(config);
	this.db.add('users');
	this.db.add('websites');
	this.db.add('actions');

	/*this.db.users.findArray(function(err, users) {
		console.log(users);
	});*/
}

module.exports = DataSource;