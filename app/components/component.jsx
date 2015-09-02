'use strict';

import React from 'react';
import User from './user.jsx';

export default class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
    }
    componentDidMount() {
        $.ajax({
            method: 'GET',
            url: 'toto'
        }).then(data => {
            this.setState({
                users: data
            });
        });
    }
    render() {
        return (
            <div>
                <h1>Welcome to the ALICE workshops!</h1>
                <input type='text'/>

                {this.state.users.map(user => <User user={user}/>)}
            </div>
        );
    }
}
