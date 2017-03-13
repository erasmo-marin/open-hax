import ActionTypes from '../Constants/ActionTypes';
import AppDispatcher from '../Dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import { assign } from 'lodash';

const _ =  {
    assign: assign
};

class ChatClass extends EventEmitter {

    constructor(props) {
        super(props);
        this.eventName = 'CHAT_CHANGE_EVENT';
        this.messages = [];
    }

    addMessage(message) {
        this.messages.push(message);
        this.emitChange();
    }

    setMessages(messages) {
        this.messages = messages;
        this.emitChange();
    }

    emitChange() {
        this.emit(this.eventName);
    }

    addChangeListener(callback) {
        this.on(this.eventName, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(this.eventName, callback);
    }
}

const Chat = new ChatClass;

Chat.dispatchToken = AppDispatcher.register((action) => {
    switch(action.actionType) {
        case ActionTypes.MESSAGE_RECEIVED:
        case ActionTypes.MESSAGE_SENT:
            console.log("new message", action);
            Chat.addMessage(action.data);
            break;
    }
});

export default Chat;