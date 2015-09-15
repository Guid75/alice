import request from 'superagent';

export const REQUEST_STUDENTS = 'REQUEST_STUDENTS';
export const RECEIVE_STUDENTS = 'RECEIVE_STUDENTS';
export const FILTER_STUDENTS = 'FILTER_STUDENTS';
export const ADD_STUDENT_REQUEST = 'ADD_STUDENT_REQUEST';
export const ADD_STUDENT_RESPONSE = 'ADD_STUDENT_RESPONSE';
export const REMOVE_STUDENT_REQUEST = 'REMOVE_STUDENT_REQUEST';
export const REMOVE_STUDENT_RESPONSE = 'REMOVE_STUDENT_RESPONSE';

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

export function addStudent(student) {
    return dispatch => {
        request
        .post('/api/v1/students')
        .set('Content-Type', 'application/json')
        .send(student)
        .end((err, res) => {
            if (err) {
                throw err;
            }
            dispatch(addStudentResponse(res.body));
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
        request
        .del('/api/v1/students/' + id)
        .end((err, res) => {
            dispatch(removeStudentResponse(id));
        });
    }
}
