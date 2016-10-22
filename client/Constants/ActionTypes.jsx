var keyMirror = require('keymirror');

module.exports = keyMirror({
	PLAYER_JOINED: "playerJoined",
	PLAYER_LEFT: "playerLeft",
	MESSAGE_RECEIVED: "messageReceived",
	MESSAGE_SENT: "messageSent",
	STATE_UPDATE: "stateUpdate",
	TIMER_PAUSE: "timerPause",
	TIMER_SET: "timerSet",
	TIMER_START: "timerStart",
	TIMER_END: "timerEnd"
});