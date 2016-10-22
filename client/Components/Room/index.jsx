import ActionTypes from '../../constants/ActionTypes';


class RoomClass {

	constructor () {
		this.suscribers = [];

		let pathArray = window.location.pathname.split( '/' );
		this.namespace = "/" + pathArray[pathArray.length - 1];
		console.log("socket namespace: ", this.namespace);

		this.socket = io(this.namespace);

	    this.socket.on(ActionTypes.PLAYER_JOINED, function (data) {
	      alert("user " + data.id + " joined");
	    });
	}

	setNamespace(namespace) {
		this.socket.leave(this.namespace);
		this.socket.joinn(namespace);
		this.namespace = namespace;
	}

	addCListener(func, event) {
		this.suscribers.push({
			func: func,
			event: event
		});
	}

	removeListener(func) {

	}

}

const room = new RoomClass();

export default room;