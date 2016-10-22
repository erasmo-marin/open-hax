var express = require('express');
var router = express.Router();
var helpers = require("../views/helpers.js");
var uuid = require('node-uuid');

const EVENTS = {
	PLAYER_JOINED: "playerJoined",
	PLAYER_LEFT: "playerLeft",
	MESSAGE_RECEIVED: "messageReceived",
	MESSAGE_SENT: "messageSent",
	STATE_UPDATE: "stateUpdate"
}

/* GET home page. */
router.get('/:id_room', function(req, res, next) {

  if(!req.session.player) {
  	req.session.player = {
  		id: uuid.v4()
  	}
  }

  res.io.of(req.params.id_room).emit(EVENTS.PLAYER_JOINED, req.session.player);
  res.render('index', { title: 'Open Hax'});
});

module.exports = router;
