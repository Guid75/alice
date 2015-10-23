'use strict';

import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import User from './User.jsx';
import { Input } from 'react-bootstrap';

export default class Students extends React.Component {
    constructor(props) {
        super(props);
    }
    filterStudent(student) {
        return student.get('firstName').toUpperCase().indexOf(this.props.studentFilter.toUpperCase()) >= 0 ||
        student.get('lastName').toUpperCase().indexOf(this.props.studentFilter.toUpperCase()) >= 0 ||
        (student.get('firstName') + ' ' + student.get('lastName')).toUpperCase().indexOf(this.props.studentFilter.toUpperCase()) >= 0;
    }
    createStudentHandler() {
        this.props.createStudentHandler(this.refs.firstName.value, this.refs.lastName.value);
    }
    render() {
        const filterStyle = {
            width: 400,
            marginLeft: 4
        };
        return (
            <div>
                <span style={filterStyle}>Filter:</span> <Input type='text' style={filterStyle} value={this.props.studentFilter} onChange={this.props.studentFilterChangeHandler}/>
                {this.props.isFetching ? <span>Fetching students...</span> : this.props.students.filter(this.filterStudent.bind(this)).map(student => <User key={student.get('id')} user={student} removeHandler={this.props.removeStudentHandler}/>)
            }
                <hr/>
                <span>First name: <input type='text' ref='firstName'/> Last name: <input type='text' ref='lastName'/> <button onClick={this.createStudentHandler.bind(this)}>Add a new student</button></span>
            </div>
        );
    }
}
