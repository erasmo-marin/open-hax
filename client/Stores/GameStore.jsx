import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import { assign } from 'lodash';

const _ =  {
    assign: assign
};

class GameClass extends EventEmitter {

    constructor(props) {
        super(props);
        this.eventName = 'GAME_CHANGE_EVENT';
        this.timer = {
            minutes: 0,
            seconds: 0
        }
    }

    setTimer(data) {
        this.timer = data;
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

const Game = new GameClass;

Game.dispatchToken = AppDispatcher.register((action) => {
    switch(action.actionType) {
        case ActionTypes.TIMER_SET:
            Game.setTimer(action.data);
            break;
    }
});

export default Game;