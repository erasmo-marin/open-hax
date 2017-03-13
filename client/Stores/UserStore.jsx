import ActionTypes from '../Constants/ActionTypes';
import AppDispatcher from '../Dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import { assign } from 'lodash';
const _ =  {
    assign: assign
};

class CastingClass extends EventEmitter {

    constructor(props) {
        super(props);
        // @TODO: change event name to all caps or change name entirely
        this.eventName = 'CASTING_CHANGE_EVENT';
        this.data = [];
        this.pagination = {};
        this.filterData = {};
        this.roles = [];
    }
    // private set methods
    setData(data) {
        if (data.pagination && data.pagination.page > 1) {
            this.data = this.data.concat(data.data.items);
        } else {
            this.data = data.data.items;
        }
        this.pagination = data.pagination;
        this.emitChange();
    }
    setFilter(filter) {
        _.assign(this.filterData,filter);
        this.emitChange();
    }
    removeFilter(filter) {
        let name = Object.keys(filter);
        delete this.filterData[name[0]];
        this.emitChange();
    }
    createCasting() {
        this.emitChange();
    }
    setRoles(roles) {
        this.roles = roles;
        this.emitChange();
    }

    // public get methods
    //
    get page() {
        return this.pagination;
    }
    get list() {
        return this.data;
    }

    get filters() {
        return this.filterData;
    }

    get listPositions() {
        return this.positions;
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

const Casting = new CastingClass;

Casting.dispatchToken = AppDispatcher.register((action) => {
    switch(action.actionType) {
        case ActionTypes.CASTING_LIST:
            Casting.setData(action.data);
            break;
        case ActionTypes.CASTING_LIST_ROLES:
            Casting.setRoles(action.data.items);
            break;
        case ActionTypes.CASTING_CREATE:
            Casting.createCasting();
            break;
        case ActionTypes.CASTING_SET_FILTER:
            Casting.setFilter(action.data);
            break;
        case ActionTypes.CASTING_REMOVE_FILTER:
            Casting.removeFilter(action.data);
            break;
    }
});

window.Casting = Casting;

export default Casting;