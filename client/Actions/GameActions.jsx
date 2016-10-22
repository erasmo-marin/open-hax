import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

let interval = null;
let paused = false;

const GameActions = {
    timerSet: (time) => {
        AppDispatcher.dispatch({
            actionType: ActionTypes.TIMER_CHANGE,
            data: time
        });
    },
    timerStart: () => {

    	let data = {
    		minutes: 0,
    		seconds: 0
    	}

        AppDispatcher.dispatch({
            actionType: ActionTypes.TIMER_START,
            data: data
        });

        if(interval != null) {
        	clearInterval(interval);
        }

        interval = setInterval( () => {
        	data.seconds++;
            if(data.seconds == 60) {
                data.seconds = 0;
                data.minutes++;
            }
        	GameActions.timerSet(data);
        }, 1000);
        
    },    
    timerEnd: () => {
        AppDispatcher.dispatch({
            actionType: ActionTypes.TIMER_END
        });
        clearInterval(interval);
    }
};

export default GameActions;