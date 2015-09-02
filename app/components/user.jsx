'use strict';

import React from 'react';

export default class User extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <p>{this.props.user.firstName} <b>{this.props.user.lastName.toUpperCase()}</b></p>
        );
    }
}
