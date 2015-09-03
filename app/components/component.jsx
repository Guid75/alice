'use strict';

import React from 'react';
import User from './user.jsx';

export default React.createClass({
    getInitialState() {
        return {
            users: [],
            filter: ''
        };
    },
    componentDidMount() {
        $.ajax({
            method: 'GET',
            url: 'api/v1/students'
        }).then(data => {
            this.setState({
                users: data
            });
        });
    },
    handleFilterChange(event) {
        this.setState({filter: event.target.value});
    },
    userContains(user, c) {
        return user.firstName.toUpperCase().indexOf(c.toUpperCase()) >= 0 || user.lastName.toUpperCase().indexOf(c.toUpperCase()) >= 0;
    },
    render() {
        return (
            <div>
                <h1>Welcome to the ALICE workshops!</h1>
                <input type='text' onChange={this.handleFilterChange}/>
                {this.state.users.filter(user => this.userContains(user, this.state.filter)).map(user => <User user={user}/>)}
            </div>
        );
    }
});
