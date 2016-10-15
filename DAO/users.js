var ds = require("../DAO/datasource.js");
var md5 = require("md5");

/*var users = new Users();
users.listAll(function(){

});

users.add({
	name: 'User 3',
    username: 'user3',
    password: '202cb962ac59075b964b07152d234b70'
},function(r) {
	console.log(r);
	users.listAll(function(results){
		users.close();
	});
});*/

function Users() {
	var db = ( new ds() ).db; 

	this.add = function (user, callback) {
		db.users.insert(user, function(err) {
		  if (!callback)
		  	return;
		  if(err)
		  	callback(err);
		  else
		  	callback(true);
		});
	}

	this.get = function (user, callback) {
		db.users.findOne(user, function(err, user) {
		  if(err || !user)
		  	callback(null);
		  else
		  	callback(user);
		});
	}


	this.listAll = function (callback) {
		db.users.findArray(function(err, results) {
		  //callback(results);
		  console.log(results);
		  if(!callback)
		  	return;
		  callback(results);
		});
	}

	this.login = function (username, password, callback) {
		db.users.findOne({username: username, password: md5(password)}, function(err, user) {
		  if(err || !user)
		  	callback(false, err);
		  else
		  	callback(true, user);
		});
	}

	this.checkApiKey = function (domain, key, callback) {

	}

	this.close = function () {
		db.close();
	}

	this.firstRun = function () {
		var self = this;
		var status = {
			active: "active",
			inactive: "inactive",
			warning: "warning",
			error: "error"
		}

	    var admin = {
	    	name: "Administrator",
	    	username: "admin",
	    	password: md5("123"),
	    	email: "admin@tourismtiger.com",
	    	registrationDate: Date.now(),
	    	avatarUrl: 'none',
	    	status: status.active
	    };

	    this.get({username: admin.username}, function(user) {
	    	if (!user) {
	    		self.add(admin, function(res){
	    			console.log("First run, created Administrator");
	    		});
	    	}
	    });
	}
}

module.exports = Users;