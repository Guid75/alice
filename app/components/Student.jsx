'use strict';

import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default class Student extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const grayedStyle = {
            color: '#DFDFDF'
        };

        return (
            <p><span style={this.props.grayed ? { color: '#DFDFDF'} : undefined}>{this.props.student.get('firstName')} <b>{this.props.student.get('lastName').toUpperCase()}</b></span> <Button bsSize="xsmall" bsStyle="danger" onClick={this.props.removeHandler.bind(null, this.props.student.get('id'))} ><Glyphicon glyph="remove" /> Remove</Button>
            </p>
        );
    }
}

Student.propTypes = {
    student: React.PropTypes.object.isRequired,
    removeHandler: React.PropTypes.func.isRequired,
    grayed: React.PropTypes.bool
};
