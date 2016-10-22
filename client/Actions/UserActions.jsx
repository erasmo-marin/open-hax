import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import ajax from 'superagent';

function dispatchLoading(id,state) {
    AppDispatcher.dispatch({
        actionType: ActionTypes.LOADING,
        data: { id: `user.${id}`, loading: state }
    });
}

const UserActions = {
    list: (client_id) => {
        let req = ajax.get('/user/');
        if (client_id) {
            req.params();
        }
    },
    me: (cb) => {
        let req = ajax.get('/me');
        dispatchLoading('me',true);
        req.end((err,response) => {
            dispatchLoading('me',false);
            if (err) {
                if (cb) {
                    return cb(err);
                }
                throw new Error(err);
            }
            if (response.body.statusCode > 299) {
                if (cb) {
                    cb(response.body);
                }
                return AppDispatcher.dispatch({
                    actionType: ActionTypes.ERROR,
                    data: response.body
                });
            }
            AppDispatcher.dispatch({
                actionType: ActionTypes.USER_ME,
                data: response.body
            });
            if (cb) {
                cb(response.body);
            }
        });
    },
    remove: (id,cb) => {
        let req = ajax.delete(`/user/${id}`);
        dispatchLoading('remove',true);
        req.end((err,response) => {
            if (err) {
                if (cb) {
                    cb(err);
                }
                throw new Error(err);
            }
            if (response.body.statusCode > 299) {
                if (cb) {
                    cb(response.body);
                }
                dispatchLoading('remove',false);
                return AppDispatcher.dispatch({
                    actionType: ActionTypes.ERROR,
                    data: response.body
                });
            }
            if (cb) {
                // check if response contains items or message/empty
                if (response.body) {
                    cb(response.body);
                }
            }
            AppDispatcher.dispatch({
                actionType: ActionTypes.CLIENT_DELETE,
                data: id
            });
            dispatchLoading('remove',false);
        });
    }
};

export default UserActions;