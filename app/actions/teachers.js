'use strict';

import request from 'superagent';

export const REQUEST_TEACHERS = 'REQUEST_TEACHERS';
export const RECEIVE_TEACHERS = 'RECEIVE_TEACHERS';
export const FILTER_TEACHERS = 'FILTER_TEACHERS';
export const ADD_TEACHER_REQUEST = 'ADD_TEACHER_REQUEST';
export const ADD_TEACHER_RESPONSE = 'ADD_TEACHER_RESPONSE';
export const REMOVE_TEACHER_REQUEST = 'REMOVE_TEACHER_REQUEST';
export const REMOVE_TEACHER_RESPONSE = 'REMOVE_TEACHER_RESPONSE';
export const REQUEST_TEACHER_EDITION_MODAL = 'REQUEST_TEACHER_CREATION_MODAL';
export const REQUEST_TEACHER_EDITION_MODAL_CANCEL = 'REQUEST_TEACHER_CREATION_MODAL_CANCEL';

function requestTeachers() {
    return {
        type: REQUEST_TEACHERS
    };
}

function receiveTeachers(teachers) {
    return {
        type: RECEIVE_TEACHERS,
        teachers: teachers
    };
}

export function fetchTeachers() {
    return dispatch => {
        dispatch(requestTeachers());
        request
        .get('/api/v1/teachers')
        .end((err, res) =>  {
            if (err) {
                throw err;
            }
            dispatch(receiveTeachers(res.body));
        });
    };
};

export function filterTeachers(filter) {
    return {
        type: FILTER_TEACHERS,
        filter: filter
    }
};

function addTeacherRequest(teacher) {
    return {
        type: ADD_TEACHER_REQUEST,
        teacher: teacher
    };
}

function addTeacherResponse(teacher) {
    return {
        type: ADD_TEACHER_RESPONSE,
        teacher: teacher
    };
}

export function addTeacher(teacher) {
    return dispatch => {
        let deferred = Promise.defer();
        dispatch(addTeacherRequest(teacher));
        request
        .post('/api/v1/teachers')
        .set('Content-Type', 'application/json')
        .send(teacher)
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
                return;
            }
            dispatch(addTeacherResponse(res.body));
            deferred.resolve();
        });
        return deferred.promise;
    };
}

function removeTeacherRequest(id) {
    return {
        type: REMOVE_TEACHER_REQUEST,
        id: id
    };
};

function removeTeacherResponse(id) {
    return {
        type: REMOVE_TEACHER_RESPONSE,
        id: id
    };
};

export function removeTeacher(id) {
    return dispatch => {
        dispatch(removeTeacherRequest(id));
        request
        .del('/api/v1/teachers/' + id)
        .end((err, res) => {
            dispatch(removeTeacherResponse(id));
        });
    }
}

export function requestTeacherEditionModal() {
    return {
        type: REQUEST_TEACHER_EDITION_MODAL
    };
}

export function requestTeacherEditionModalCancel() {
    return {
        type: REQUEST_TEACHER_EDITION_MODAL_CANCEL
    };
}
