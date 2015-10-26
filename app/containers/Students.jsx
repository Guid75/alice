'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon } from 'react-bootstrap';
import Student from '../components/Student.jsx';
import { Input } from 'react-bootstrap';
import { fetchStudents, filterStudents, addStudent, removeStudent } from '../actions';
import { List } from 'immutable';

class Students extends React.Component {
    constructor(props) {
        super(props);
    }
    studentFilterChangeHandler(event) {
        this.props.dispatch(filterStudents(event.target.value));
    }
    removeStudentHandler(id) {
        this.props.dispatch(removeStudent(id));
    }
    createStudentHandler() {
        this.props.dispatch(addStudent({
            firstName: this.refs.firstName.value,
            lastName: this.refs.lastName.value
        }));
    }
    filterStudent(student) {
        return student.get('firstName').toUpperCase().indexOf(this.props.filter.toUpperCase()) >= 0 ||
        student.get('lastName').toUpperCase().indexOf(this.props.filter.toUpperCase()) >= 0 ||
        (student.get('firstName') + ' ' + student.get('lastName')).toUpperCase().indexOf(this.props.filter.toUpperCase()) >= 0;
    }
    render() {
        const filterStyle = {
            width: 400,
            marginLeft: 4
        };
        return (
            <div>
                <span style={filterStyle}>Filter:</span> <Input type='text' style={filterStyle} value={this.props.filter} onChange={this.studentFilterChangeHandler.bind(this)}/>
                {this.props.isFetching ?
                    <span>Fetching students...</span> : this.props.students.filter(this.filterStudent.bind(this)).map(student => <Student key={student.get('id')} student={student} removeHandler={this.removeStudentHandler.bind(this)}/>)
}
                <hr/>
                <span>First name: <input type='text' ref='firstName'/> Last name: <input type='text' ref='lastName'/> <button onClick={this.createStudentHandler.bind(this)}>Add a new student</button></span>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
      students: state.getIn(['students', 'items'], List()),
      filter: state.getIn(['students', 'filter'], ''),
      isFetching: state.getIn(['students', 'isFetching'], false)
  };
}

export default connect(mapStateToProps)(Students);
