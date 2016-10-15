var express = require('express');
var router = express.Router();
var Users = require('../../../DAO/users.js');
var md5 = require('md5');

var status = {
	active: "active",
	inactive: "inactive",
	warning: "warning",
	error: "error"
}

var user = function(args) {
	this.name = args.name;
	this.username = args.username;
	this.password = args.password;
	this.email = args.email;
	this.registrationDate = args.registrationDate;
	this.avatarUrl = args.avatarUrl;
	this.status = args.status;
}


router.post('/', function(req, res) {
    console.log(req.body);

    var users = new Users();

    var newUser = new user({
    	name: req.body.name,
    	username: req.body.username,
    	password: md5(req.body.password),
    	email: req.body.email,
    	registrationDate: Date.now(),
    	avatarUrl: 'none',
    	status: status.active
    });

    users.add(newUser, function(done) {
    	if(done) {
		    res.send({
		    	response: "ok"
		    });
    	} else {
		     res.send({
		    	response: done
		    });
    	}
    }); 
});

router.get('/', function(req, res) {
    console.log(req.query);
    var users = new Users();

    users.listAll(function(users) {
    	res.send(users);
    });
});

router.get('/:username', function(req, res) {
    console.log(req.query);
    res.send([]);
});

module.exports = router;