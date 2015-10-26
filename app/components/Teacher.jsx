'use strict';

import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default class Teacher extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <p>{this.props.teacher.get('firstName')} <b>{this.props.teacher.get('lastName')}</b> <Button bsSize="xsmall" bsStyle="danger" onClick={this.props.removeHandler.bind(null, this.props.teacher.get('id'))} ><Glyphicon glyph="remove" /> Remove</Button>
            </p>
        );
    }
}
