'use strict';

import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        };
    }
    mouseOver() {
        this.setState({hover: true});
    }
    mouseOut() {
        this.setState({hover: false});
    }
    render() {
        const grayedStyle = {
            color: '#DFDFDF'
        };

        return (
            <p
                onMouseEnter={this.mouseOver.bind(this)}
                onMouseLeave={this.mouseOut.bind(this)}>
                <span style={this.props.grayed ? { color: '#DFDFDF'} : undefined}>{this.props.student.get('firstName')} <b>{this.props.student.get('lastName').toUpperCase()}</b></span> {this.state.hover ? <Button bsSize="xsmall" bsStyle="danger" className='pull-right' onClick={this.props.removeHandler.bind(null, this.props.student.get('id'))} ><Glyphicon glyph="remove" /> Remove</Button> : undefined }
            </p>
        );
    }
}

Student.propTypes = {
    student: React.PropTypes.object.isRequired,
    removeHandler: React.PropTypes.func.isRequired,
    grayed: React.PropTypes.bool
};
