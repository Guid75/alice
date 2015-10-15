'use strict';

import React from 'react';
import { connect } from 'react-redux';
import User from '../components/user.jsx';
import { fetchStudents, filterStudents, addStudent, removeStudent } from '../actions';
import { List, Map, fromJS } from 'immutable';
import { Input, Nav, NavItem } from 'react-bootstrap';

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
        const filterStyle = {
            width: 400,
            marginLeft: 4
        };
        return (
            <div>
                <h1>Welcome to the ALICE workshops!</h1>
                <Nav bsStyle="tabs" activeKey={1}>
                    <NavItem eventKey={1} >Students</NavItem>
                    <NavItem eventKey={2} >Time slots</NavItem>
                </Nav>
                <span style={filterStyle}>Filter:</span> <Input type='text' style={filterStyle} onChange={this.handleFilterChange}/>
            {this.props.students.filter(this.filterStudent).map(student => <User user={student} removeHandler={this.removeHandler}/>)}
                <hr/>
                <span>First name: <input type='text' ref='firstName'/> Last name: <input type='text' ref='lastName'/> <button onClick={this.createStudent}>Add a new student</button></span>
            </div>
        );
    }
});

function mapStateToProps(state) {
  return {
      students: state.getIn(['students', 'items'], List()),
      filter: state.getIn(['students', 'filter'], ''),
      isFetching: state.getIn(['students', 'isFetching'], false)
  };
}

export default connect(mapStateToProps)(App);
