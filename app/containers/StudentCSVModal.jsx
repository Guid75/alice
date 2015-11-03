'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, DropdownButton, MenuItem } from 'react-bootstrap';
import { List } from 'immutable';
import Loader from 'react-loader';
import { studentCSVModalClose, importStudents } from '../actions/students';

require('promise.prototype.finally');

let modal = React.createClass({
    getInitialState() {
        return {
            firstName: '',
            lastName: '',
            formation: '',
            saving: false
        };
    },
    applyHandler() {
        const dispatch = this.props.dispatch;

        this.setState({
            saving: true
        });

        dispatch(importStudents(this.refs.csv.getValue()))
        .then(() => {
            dispatch(studentCSVModalClose());
        })
        .finally(() => {
            this.setState({
                saving: false
            });
        });
    },
    cancelHandler() {
        this.props.dispatch(studentCSVModalClose());
    },
    fillArea() {
        this.refs.csv.getInputDOMNode().value = 'Guillaume;Denry;Terminal Agri\nVincent;Denry;1ere Horti\nBenoit;Denry;Terminal Agri\n'
    },
    render() {
        const textAreaStyle = {
            height: '15em'
        };
        return (
            <Modal show={this.props.displayCSVModal} onHide={this.cancelHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Import students</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='form-horizontal'>
                        <Input type='textarea' style={textAreaStyle} ref='csv' autoFocus label='Copy your CSV here' labelClassName="col-xs-2" wrapperClassName="col-xs-10" help='firstname;lastname;formation'/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Loader loaded={!this.state.saving}>
                    </Loader>
                    <Button bsStyle='default' onClick={this.fillArea}>Fill area with dummy data</Button>
                    <Button bsStyle='primary' onClick={this.applyHandler}>Create</Button>
                    <Button bsStyle='danger' onClick={this.cancelHandler}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
});

function mapStateToProps(state) {
    return {
        displayCSVModal: state.getIn(['students', 'displayCSVModal'], false),
        formations: state.getIn(['formations', 'items'], List())
    };
}

export default connect(mapStateToProps)(modal);
