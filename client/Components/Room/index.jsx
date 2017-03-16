import ActionTypes from '../../Constants/ActionTypes';


class Room {

	constructor (namespace) {
		this.suscribers = [];
		this.namespace = "/" + namespace;
		console.log("socket namespace: ", this.namespace);
		this.socket = io(this.namespace);

		for (let prop in ActionTypes) {
		    if (ActionTypes.hasOwnProperty(prop)) {
			    this.socket.on(ActionTypes[prop], (data) => {
			    	this.sendEvents(ActionTypes[prop], data);
			    });
		    }
		}
	}


	send(event, data) {
		this.socket.emit(event, data);
	}

	sendEvents(event, data) {
		console.log(event, data);

		this.suscribers.map((suscriber) => {
			if(suscriber.event == event && suscriber.func) {
				suscriber.func(event, data);
			}
		})

	}

	setNamespace(namespace) {
		this.socket.leave(this.namespace);
		this.socket.joinn(namespace);
		this.namespace = namespace;
	}

	addListener(func, event) {
		this.suscribers.push({
			func: func,
			event: event
		});
	}

	removeListener(func) {

	}

}

export default Room;