'use strict';

import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default class User extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <p key={this.props.user.get('id')}>{this.props.user.get('firstName')} <b>{this.props.user.get('lastName').toUpperCase()}</b> <Button bsSize="xsmall" bsStyle="danger" onClick={this.props.removeHandler.bind(this, this.props.user.get('id'))} ><Glyphicon glyph="remove" /> Remove</Button>
            </p>
        );
    }
}
