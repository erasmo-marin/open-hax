import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

const ChatActions = {
    send: (message) => {
        AppDispatcher.dispatch({
            actionType: ActionTypes.MESSAGE_SENT,
            data: {
                nickname: "ojo",
                text: message
            }
        });
    }
};

export default ChatActions;