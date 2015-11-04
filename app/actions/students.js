'use strict';

import request from 'superagent';

export const REQUEST_STUDENTS = 'REQUEST_STUDENTS';
export const RECEIVE_STUDENTS = 'RECEIVE_STUDENTS';
export const FILTER_STUDENTS = 'FILTER_STUDENTS';
export const ADD_STUDENT_REQUEST = 'ADD_STUDENT_REQUEST';
export const ADD_STUDENT_RESPONSE = 'ADD_STUDENT_RESPONSE';
export const ADD_STUDENT_ERROR = 'ADD_STUDENT_ERROR';
export const REMOVE_STUDENT_REQUEST = 'REMOVE_STUDENT_REQUEST';
export const REMOVE_STUDENT_RESPONSE = 'REMOVE_STUDENT_RESPONSE';
export const STUDENT_EDITION_MODAL_SHOW = 'STUDENT_EDITION_MODAL_SHOW';
export const STUDENT_EDITION_MODAL_CLOSE = 'STUDENT_EDITION_MODAL_CLOSE';
export const STUDENT_CSV_MODAL_SHOW = 'STUDENT_CSV_MODAL_SHOW';
export const STUDENT_CSV_MODAL_CLOSE = 'STUDENT_CSV_MODAL_CLOSE';
export const IMPORT_STUDENTS_REQUEST = 'IMPORT_STUDENTS_REQUEST';
export const IMPORT_STUDENTS_RESPONSE = 'IMPORT_STUDENTS_RESPONSE';
export const IMPORT_STUDENTS_ERROR = 'IMPORT_STUDENTS_ERROR';
export const IMPORT_STUDENTS_CHANGE_FORMATION = 'IMPORT_STUDENTS_CHANGE_FORMATION';

function requestStudents() {
    return {
        type: REQUEST_STUDENTS
    };
}

function receiveStudents(students) {
    return {
        type: RECEIVE_STUDENTS,
        students: students
    };
}

export function fetchStudents() {
    return dispatch => {
        dispatch(requestStudents());
        request
        .get('/api/v1/students')
        .end((err, res) =>  {
            if (err) {
                throw err;
            }
            dispatch(receiveStudents(res.body));
        });
    };
};

export function filterStudents(filter) {
    return {
        type: FILTER_STUDENTS,
        filter: filter
    }
};

function addStudentRequest(student) {
    return {
        type: ADD_STUDENT_REQUEST,
        student: student
    };
}

function addStudentResponse(student) {
    return {
        type: ADD_STUDENT_RESPONSE,
        student: student
    };
}

function addStudentError(err) {
    return {
        type: ADD_STUDENT_ERROR,
        error: err
    };
}

export function addStudent(student) {
    return dispatch => {
        dispatch(addStudentRequest(student));
        return new Promise(function (resolve, reject) {
            request
            .post('/api/v1/students')
            .set('Content-Type', 'application/json')
            .send(student)
            .end((err, res) => {
                if (err) {
                    dispatch(addStudentError(err));
                    reject(err);
                    return;
                }
                dispatch(addStudentResponse(res.body));
                resolve();
            });
        });
    };
}

function removeStudentRequest(id) {
    return {
        type: REMOVE_STUDENT_REQUEST,
        id: id
    };
};

function removeStudentResponse(id) {
    return {
        type: REMOVE_STUDENT_RESPONSE,
        id: id
    };
};

export function removeStudent(id) {
    return dispatch => {
        dispatch(removeStudentRequest(id));
        request
        .del('/api/v1/students/' + id)
        .end((err, res) => {
            dispatch(removeStudentResponse(id));
        });
    }
}

export function studentEditionModalShow() {
    return {
        type: STUDENT_EDITION_MODAL_SHOW
    };
}

export function studentEditionModalClose() {
    return {
        type: STUDENT_EDITION_MODAL_CLOSE
    };
}

export function studentCSVModalShow() {
    return {
        type: STUDENT_CSV_MODAL_SHOW
    };
}

export function studentCSVModalClose() {
    return {
        type: STUDENT_CSV_MODAL_CLOSE
    };
}

function importStudentsRequest() {
    return {
        type: IMPORT_STUDENTS_REQUEST
    };
}

function importStudentsResponse(toInsert) {
    return {
        type: IMPORT_STUDENTS_RESPONSE,
        toInsert
    };
}

function importStudentsError(err) {
    return {
        type: IMPORT_STUDENTS_ERROR,
        error: err
    };
}

export function importStudentsChangeFormation(newFormationTitle) {
    return {
        type: IMPORT_STUDENTS_CHANGE_FORMATION,
        title: newFormationTitle
    };
}

export function importStudents(csv, formationTitle) {
    return dispatch => {
        dispatch(importStudentsRequest());
        return new Promise(function (resolve, reject) {
            request
            .post('/api/v1/import/students')
            .query(formationTitle ? {
                formation: formationTitle
            } : undefined)
            .set('Content-Type', 'text/csv')
            .send(csv)
            .end((err, res) => {
                if (err) {
                    dispatch(importStudentsError(err));
                    reject(err);
                    return;
                }
                dispatch(importStudentsResponse(res.body));
                resolve();
            });
        });
    };
}
