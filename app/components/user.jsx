'use strict';

import React from 'react';

export default class User extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <p key={this.props.user.get('id')}>{this.props.user.get('firstName')} <b>{this.props.user.get('lastName').toUpperCase()}</b> <button onClick={this.props.removeHandler.bind(this, this.props.user.get('id'))} >Remove</button></p>
        );
    }
}
