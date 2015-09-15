'use strict';

import React from 'react';
import { connect } from 'react-redux';
import User from '../components/user.jsx';
import { fetchStudents, filterStudents, addStudent, removeStudent } from '../actions';

var App = React.createClass({
    componentDidMount() {
        this.props.dispatch(fetchStudents());
    },
    handleFilterChange(event) {
        this.props.dispatch(filterStudents(event.target.value));
    },
    createStudent() {
        this.props.dispatch(addStudent({
            firstName: React.findDOMNode(this.refs.firstName).value,
            lastName: React.findDOMNode(this.refs.lastName).value
        }));
    },
    filterStudent(student) {
        return student.get('firstName').toUpperCase().indexOf(this.props.filter.toUpperCase()) >= 0 ||
        student.get('lastName').toUpperCase().indexOf(this.props.filter.toUpperCase()) >= 0;
    },
    removeHandler(id) {
        this.props.dispatch(removeStudent(id));
    },
    render() {
        return (
            <div>
                <h1>Welcome to the ALICE workshops!</h1>
                Filter: <input type='text' onChange={this.handleFilterChange}/>
            {this.props.students.filter(this.filterStudent).map(student => <User user={student} removeHandler={this.removeHandler}/>)}
                <hr/>
                <span>First name: <input type='text' ref='firstName'/> Last name: <input type='text' ref='lastName'/> <button onClick={this.createStudent}>Add a new student</button></span>
            </div>
        );
    }
});

function mapStateToProps(state) {
  return {
      students: state.students.get('items'),
      filter: state.students.get('filter'),
      isFetching: state.students.get('isFetching')
  };
}

export default connect(mapStateToProps)(App);
