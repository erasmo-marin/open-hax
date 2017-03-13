import AppDispatcher from '../Dispatcher/AppDispatcher';
import ActionTypes from '../Constants/ActionTypes';

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