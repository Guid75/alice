'use strict';

import React from 'react';
import User from './user.jsx';
import { fetchStudents } from '../actions';

export default React.createClass({
    getInitialState() {
        return {
            users: [],
            filter: ''
        };
    },
    componentDidMount() {

        // $.ajax({
        //     method: 'GET',
        //     url: 'api/v1/students'
        // }).then(data => {
        //     this.setState({
        //         users: data
        //     });
        // });
    },
    handleFilterChange(event) {
        this.setState({filter: event.target.value});
    },
    createStudent() {
        const firstName = React.findDOMNode(this.refs.firstName).value;
        const lastName = React.findDOMNode(this.refs.lastName).value;

        $.ajax({
            method: 'POST',
            url: 'api/v1/students',
            contentType: 'application/json',
    		data: JSON.stringify({ firstName: firstName, lastName: lastName })
        }).done(data => {
            this.setState({ users: this.state.users.concat([data])});
        }).fail((err) => {
            console.error(err);
        });
    },
    userContains(user, c) {
        return user.firstName.toUpperCase().indexOf(c.toUpperCase()) >= 0 || user.lastName.toUpperCase().indexOf(c.toUpperCase()) >= 0;
    },
    render() {
        return (
            <div>
                <h1>Welcome to the ALICE workshops!</h1>
                Filter: <input type='text' onChange={this.handleFilterChange}/>
                {this.state.users.filter(user => this.userContains(user, this.state.filter)).map(user => <User user={user}/>)}
                <hr/>
                <span>First name: <input type='text' ref='firstName'/> Last name: <input type='text' ref='lastName'/> <button onClick={this.createStudent}>Add a new student</button></span>
            </div>
        );
    }
});
