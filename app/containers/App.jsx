'use strict';

import React from 'react';
import { connect } from 'react-redux';
import User from '../components/user.jsx';
import AppHeader from '../components/AppHeader.jsx';
import MainTabBar from '../components/MainTabBar.jsx';
import { fetchStudents, filterStudents, addStudent, removeStudent, selectTab } from '../actions';
import { List, Map, fromJS } from 'immutable';
import { Input } from 'react-bootstrap';

var App = React.createClass({
    componentDidMount() {
        this.props.dispatch(fetchStudents());
    },
    handleFilterChange(event) {
        this.props.dispatch(filterStudents(event.target.value));
    },
    createStudent() {
        this.props.dispatch(addStudent({
            firstName: this.refs.firstName.value,
            lastName: this.refs.lastName.value
        }));
    },
    filterStudent(student) {
        return student.get('firstName').toUpperCase().indexOf(this.props.filter.toUpperCase()) >= 0 ||
        student.get('lastName').toUpperCase().indexOf(this.props.filter.toUpperCase()) >= 0;
    },
    removeHandler(id) {
        this.props.dispatch(removeStudent(id));
    },
    handleTabSelect(key) {
        this.props.dispatch(selectTab(key));
    },
    render() {
        const filterStyle = {
            width: 400,
            marginLeft: 4
        };
        return (
            <div>
                <AppHeader />
                <MainTabBar currentTab={this.props.currentTab} handleTabSelect={this.handleTabSelect}/>
                <span style={filterStyle}>Filter:</span> <Input type='text' style={filterStyle} onChange={this.handleFilterChange}/>
            {this.props.students.filter(this.filterStudent).map(student => <User key={student.get('id')} user={student} removeHandler={this.removeHandler}/>)}
                <hr/>
                <span>First name: <input type='text' ref='firstName'/> Last name: <input type='text' ref='lastName'/> <button onClick={this.createStudent}>Add a new student</button></span>
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
