'use strict';

import { List, Map, fromJS } from 'immutable';
import combineReducers from '../utils/reducers';

let reducers = {
    teachers: {
        REQUEST_TEACHERS: (domain, action) => domain.merge({ isFetching: true }),
        RECEIVE_TEACHERS: (domain, action) => domain.merge({
            isFetching: false,
            items: fromJS(action.teachers)
        }),
        FILTER_TEACHERS: (domain, action) => domain.merge({ filter: action.filter }),
        ADD_TEACHER_RESPONSE: (domain, action) => domain.merge({ items: domain.get('items').push(fromJS(action.teacher))}),
        REMOVE_TEACHER_RESPONSE: (domain, action) => domain.merge({ items: domain.get('items').delete(domain.get('items').findIndex(item => item.get('id') === action.id))}),
        TEACHER_EDITION_MODAL_SHOW: (domain, action) => domain.set('displayEditionModal', true),
        TEACHER_EDITION_MODAL_CLOSE: (domain, action) => domain.set('displayEditionModal', false)
    },
    students: {
        REQUEST_STUDENTS: (domain, action) => domain.merge({ isFetching: true }),
        RECEIVE_STUDENTS: (domain, action) => domain.merge({
            isFetching: false,
            items: fromJS(action.students)
        }),
        FILTER_STUDENTS: (domain, action) => domain.merge({ filter: action.filter }),
        ADD_STUDENT_RESPONSE: (domain, action) => domain.merge({ items: domain.get('items').push(fromJS(action.student))}),
        REMOVE_STUDENT_RESPONSE: (domain, action) => domain.merge({ items: domain.get('items').delete(domain.get('items').findIndex(item => item.get('id') === action.id))}),
        STUDENT_EDITION_MODAL_SHOW: (domain, action) => domain.set('displayEditionModal', true),
        STUDENT_EDITION_MODAL_CLOSE: (domain, action) => domain.set('displayEditionModal', false),
        STUDENT_CSV_MODAL_SHOW: (domain, action) => domain.set('displayCSVModal', true),
        STUDENT_CSV_MODAL_CLOSE: (domain, action) => domain.set('displayCSVModal', false),
        IMPORT_STUDENTS_CHANGE_FORMATION: (domain, action) => domain.set('csvModalFormation', action.title)
    },
    formations: {
        REQUEST_FORMATIONS: (domain, action) => domain.merge({ isFetching: true }),
        RECEIVE_FORMATIONS: (domain, action) => domain.merge({
            isFetching: false,
            items: fromJS(action.formations)
        }),
        FILTER_FORMATIONS: (domain, action) => domain.merge({ filter: action.filter }),
        ADD_FORMATION_RESPONSE: (domain, action) => domain.merge({ items: domain.get('items').push(fromJS(action.formation))}),
        REMOVE_FORMATION_RESPONSE: (domain, action) => domain.merge({ items: domain.get('items').delete(domain.get('items').findIndex(item => item.get('id') === action.id))})
    },
    SELECT_TAB: (domain, action) => domain.set('currentTab', action.tab),
    IMPORT_STUDENTS_RESPONSE: (domain, action) => {
        var d = domain.merge({
            students: domain.get('students').merge({
                items: domain.getIn(['students', 'items']).toJS().concat(action.toInsert.students)
            }),
            formations: domain.get('formations').merge({
                items: domain.getIn(['formations', 'items']).toJS().concat(action.toInsert.formations)
            })
        });
        return d;
    }
};

export default combineReducers(reducers);
