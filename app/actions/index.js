import request from 'superagent';

export const REQUEST_STUDENTS = 'REQUEST_STUDENTS';
export const RECEIVE_STUDENTS = 'RECEIVE_STUDENTS';
export const FILTER_STUDENTS = 'FILTER_STUDENTS';

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
        // // $.ajax({
        // //     method: 'GET',
        // //     url: 'api/v1/students'
        // // }).then(data => {
        // //     this.setState({
        // //         users: data
        // //     });
        // // });
        // console.log('fetchStudents');
    };
};

export function filterStudents(filter) {
        return {
            type: FILTER_STUDENTS,
            filter: filter
        }
};
