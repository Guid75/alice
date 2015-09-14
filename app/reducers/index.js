import {List, Map, fromJS} from 'immutable';
import { combineReducers } from 'redux';
import {
  REQUEST_STUDENTS, RECEIVE_STUDENTS, FILTER_STUDENTS
} from '../actions';

function students(state = fromJS({
    isFetching: false,
    items: [],
    filter: ''
}), action) {
    switch (action.type) {
        case REQUEST_STUDENTS:
        return state.merge({
            isFetching: true
        });
        case RECEIVE_STUDENTS:
        return state.merge({
            isFetching: false,
            items: fromJS(action.students)
        });
        case FILTER_STUDENTS:
        return state.merge({
            filter: action.filter
        });
        default:
        return state;
    }
}

const rootReducer = combineReducers({
  students
});

export default rootReducer;
