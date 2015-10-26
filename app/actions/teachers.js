'use strict';

import request from 'superagent';

export const REQUEST_TEACHERS = 'REQUEST_TEACHERS';
export const RECEIVE_TEACHERS = 'RECEIVE_TEACHERS';
export const FILTER_TEACHERS = 'FILTER_TEACHERS';
export const ADD_TEACHER_REQUEST = 'ADD_TEACHER_REQUEST';
export const ADD_TEACHER_RESPONSE = 'ADD_TEACHER_RESPONSE';
export const ADD_TEACHER_ERROR = 'ADD_TEACHER_ERROR';
export const REMOVE_TEACHER_REQUEST = 'REMOVE_TEACHER_REQUEST';
export const REMOVE_TEACHER_RESPONSE = 'REMOVE_TEACHER_RESPONSE';
export const TEACHER_EDITION_MODAL_SHOW = 'TEACHER_EDITION_MODAL_SHOW';
export const TEACHER_EDITION_MODAL_CLOSE = 'TEACHER_EDITION_MODAL_CLOSE';

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

function addTeacherError(err) {
    return {
        type: ADD_TEACHER_ERROR,
        error: err
    };
}

export function addTeacher(teacher) {
    return dispatch => {
        dispatch(addTeacherRequest(teacher));
        return new Promise(function (resolve, reject) {
            request
            .post('/api/v1/teachers')
            .set('Content-Type', 'application/json')
            .send(teacher)
            .end((err, res) => {
                if (err) {
                    dispatch(addTeacherError(err));
                    reject(err);
                    return;
                }
                dispatch(addTeacherResponse(res.body));
                resolve();
            });
        });
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

export function teacherEditionModalShow() {
    return {
        type: TEACHER_EDITION_MODAL_SHOW
    };
}

export function teacherEditionModalClose() {
    return {
        type: TEACHER_EDITION_MODAL_CLOSE
    };
}
