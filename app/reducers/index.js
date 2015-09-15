import {List, Map, fromJS} from 'immutable';
import { combineReducers } from 'redux';
import {
  REQUEST_STUDENTS, RECEIVE_STUDENTS, FILTER_STUDENTS,
  ADD_STUDENT_REQUEST, ADD_STUDENT_RESPONSE,
  REMOVE_STUDENT_REQUEST, REMOVE_STUDENT_RESPONSE
} from '../actions';

function students(state = fromJS({
    isFetching: false,
    items: [],
    filter: ''
}), action) {
    var items = state.get('items');
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
        case ADD_STUDENT_REQUEST:
        return state;
        case ADD_STUDENT_RESPONSE:
        return state.merge({
            items: items.push(fromJS(action.student))
        });
        case REMOVE_STUDENT_RESPONSE:
        return state.merge({
            items: items.delete(items.findIndex(item => item.get('id') === action.id))
        });
        default:
        return state;
    }
}

const rootReducer = combineReducers({
  students
});

export default rootReducer;
