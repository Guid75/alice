'use strict';

import React from 'react';
import { connect } from 'react-redux';
import User from '../components/user.jsx';
import { fetchStudents, filterStudents } from '../actions';

var App = React.createClass({
    componentDidMount() {

        // $.ajax({
        //     method: 'GET',
        //     url: 'api/v1/students'
        // }).then(data => {
        //     this.setState({
        //         users: data
        //     });
        // });
        this.props.dispatch(fetchStudents());
    },
    handleFilterChange(event) {
        this.props.dispatch(filterStudents(event.target.value));
        // this.setState({filter: event.target.value});
    },
    createStudent() {
        const firstName = React.findDOMNode(this.refs.firstName).value;
        const lastName = React.findDOMNode(this.refs.lastName).value;

        // $.ajax({
        //     method: 'POST',
        //     url: 'api/v1/students',
        //     contentType: 'application/json',
    	// 	data: JSON.stringify({ firstName: firstName, lastName: lastName })
        // }).done(data => {
        //     this.setState({ users: this.state.users.concat([data])});
        // }).fail((err) => {
        //     console.error(err);
        // });
    },
    filterStudent(student) {
        return student.get('firstName').toUpperCase().indexOf(this.props.filter.toUpperCase()) >= 0 ||
        student.get('lastName').toUpperCase().indexOf(this.props.filter.toUpperCase()) >= 0;
    },
    render() {
        return (
            <div>
                <h1>Welcome to the ALICE workshops!</h1>
                Filter: <input type='text' onChange={this.handleFilterChange}/>
                {this.props.students.filter(this.filterStudent).map(student => <User user={student}/>)}
                <hr/>
                <span>First name: <input type='text' ref='firstName'/> Last name: <input type='text' ref='lastName'/> <button onClick={this.createStudent}>Add a new student</button></span>
            </div>
        );
    }
//    {this.props.students.filter(student => this.userContains(user, this.state.filter)).map(user => <User user={user}/>)}
});

function mapStateToProps(state) {
  return {
      students: state.students.get('items'),
      filter: state.students.get('filter'),
      isFetching: state.students.get('isFetching')
  };
}

export default connect(mapStateToProps)(App);
