'use strict';

import { List, Map, fromJS } from 'immutable';
import { SELECT_TAB } from '../actions/';
import {
  REQUEST_STUDENTS, RECEIVE_STUDENTS, FILTER_STUDENTS,
  ADD_STUDENT_REQUEST, ADD_STUDENT_RESPONSE,
  REMOVE_STUDENT_REQUEST, REMOVE_STUDENT_RESPONSE,
  STUDENT_EDITION_MODAL_SHOW, STUDENT_EDITION_MODAL_CLOSE
} from '../actions/students';
import {
    REQUEST_TEACHERS, RECEIVE_TEACHERS, FILTER_TEACHERS,
    ADD_TEACHER_REQUEST, ADD_TEACHER_RESPONSE,
    REMOVE_TEACHER_REQUEST, REMOVE_TEACHER_RESPONSE,
    TEACHER_EDITION_MODAL_SHOW, TEACHER_EDITION_MODAL_CLOSE
} from '../actions/teachers';
import {
    REQUEST_FORMATIONS, RECEIVE_FORMATIONS, FILTER_FORMATIONS,
    ADD_FORMATION_REQUEST, ADD_FORMATION_RESPONSE,
    REMOVE_FORMATION_REQUEST, REMOVE_FORMATION_RESPONSE
} from '../actions/formations';

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
        case STUDENT_EDITION_MODAL_SHOW:
        return state.set('displayEditionModal', true);
        case STUDENT_EDITION_MODAL_CLOSE:
        return state.set('displayEditionModal', false);
        default:
        return state;
    }
}

function teachers(state = fromJS({
    isFetching: false,
    items: [],
    filter: ''
}), action) {
    var items = state.get('items');
    switch (action.type) {
        case REQUEST_TEACHERS:
        return state.merge({
            isFetching: true
        });
        case RECEIVE_TEACHERS:
        return state.merge({
            isFetching: false,
            items: fromJS(action.teachers)
        });
        case FILTER_TEACHERS:
        return state.merge({
            filter: action.filter
        });
        case ADD_TEACHER_REQUEST:
        return state;
        case ADD_TEACHER_RESPONSE:
        return state.merge({
            items: items.push(fromJS(action.teacher))
        });
        case REMOVE_TEACHER_RESPONSE:
        return state.merge({
            items: items.delete(items.findIndex(item => item.get('id') === action.id))
        });
        case TEACHER_EDITION_MODAL_SHOW:
        return state.set('displayEditionModal', true);
        case TEACHER_EDITION_MODAL_CLOSE:
        return state.set('displayEditionModal', false);
        default:
        return state;
    }
}

function formations(state = fromJS({
    isFetching: false,
    items: [],
    filter: ''
}), action) {
    var items = state.get('items');
    switch (action.type) {
        case REQUEST_FORMATIONS:
        return state.merge({
            isFetching: true
        });
        case RECEIVE_FORMATIONS:
        return state.merge({
            isFetching: false,
            items: fromJS(action.formations)
        });
        case FILTER_FORMATIONS:
        return state.merge({
            filter: action.filter
        });
        case ADD_FORMATION_REQUEST:
        return state;
        case ADD_FORMATION_RESPONSE:
        return state.merge({
            items: items.push(fromJS(action.formation))
        });
        case REMOVE_FORMATION_RESPONSE:
        return state.merge({
            items: items.delete(items.findIndex(item => item.get('id') === action.id))
        });
        default:
        return state;
    }
}

export default function reducer(state = Map({ currentTab: 'students' }), action) {
    switch (action.type) {
        case REQUEST_STUDENTS:
        case RECEIVE_STUDENTS:
        case FILTER_STUDENTS:
        case ADD_STUDENT_REQUEST:
        case ADD_STUDENT_RESPONSE:
        case REMOVE_STUDENT_RESPONSE:
        case STUDENT_EDITION_MODAL_SHOW:
        case STUDENT_EDITION_MODAL_CLOSE:
        return state.update(
            'students', studentsState => students(studentsState, action));
        case REQUEST_TEACHERS:
        case RECEIVE_TEACHERS:
        case FILTER_TEACHERS:
        case ADD_TEACHER_REQUEST:
        case ADD_TEACHER_RESPONSE:
        case REMOVE_TEACHER_RESPONSE:
        case TEACHER_EDITION_MODAL_SHOW:
        case TEACHER_EDITION_MODAL_CLOSE:
        return state.update(
            'teachers', teachersState => teachers(teachersState, action));
        case REQUEST_FORMATIONS:
        case RECEIVE_FORMATIONS:
        case FILTER_FORMATIONS:
        case ADD_FORMATION_REQUEST:
        case ADD_FORMATION_RESPONSE:
        case REMOVE_FORMATION_RESPONSE:
        return state.update(
            'formations', formationsState => formations(formationsState, action));
        case SELECT_TAB:
        return state.set('currentTab', action.tab);
        default:
        return state;
    }
}
