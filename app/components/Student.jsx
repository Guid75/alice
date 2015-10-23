'use strict';

import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default class Student extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <p>{this.props.student.get('firstName')} <b>{this.props.student.get('lastName').toUpperCase()}</b> <Button bsSize="xsmall" bsStyle="danger" onClick={this.props.removeHandler.bind(null, this.props.student.get('id'))} ><Glyphicon glyph="remove" /> Remove</Button>
            </p>
        );
    }
}
