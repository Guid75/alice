'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Students from '../components/Students.jsx';
import AppHeader from '../components/AppHeader.jsx';
import MainTabBar from '../components/MainTabBar.jsx';
import { fetchStudents, filterStudents, addStudent, removeStudent, selectTab } from '../actions';
import { List, Map, fromJS } from 'immutable';

var App = React.createClass({
    componentDidMount() {
        this.props.dispatch(fetchStudents());
    },
    studentFilterChange(event) {
        this.props.dispatch(filterStudents(event.target.value));
    },
    createStudent(firstName, lastName) {
        this.props.dispatch(addStudent({
            firstName,
            lastName
        }));
    },
    removeStudent(id) {
        this.props.dispatch(removeStudent(id));
    },
    handleTabSelect(key) {
        this.props.dispatch(selectTab(key));
    },
    render() {
        return (
            <div>
                <AppHeader />
                <MainTabBar currentTab={this.props.currentTab} handleTabSelect={this.handleTabSelect}/>
                <Students
                    isFetching={this.props.isFetching}
                    students={this.props.students}
                    studentFilter={this.props.filter}
                    studentFilterChangeHandler={this.studentFilterChange}
                    createStudentHandler={this.createStudent}
                    removeStudentHandler={this.removeStudent}
                     />
            </div>
        );
    }
});

function mapStateToProps(state) {
  return {
      currentTab: state.get('currentTab') || 1,
      students: state.getIn(['students', 'items'], List()),
      filter: state.getIn(['students', 'filter'], ''),
      isFetching: state.getIn(['students', 'isFetching'], false)
  };
}

export default connect(mapStateToProps)(App);
