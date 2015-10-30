'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, DropdownButton, MenuItem } from 'react-bootstrap';
import { List } from 'immutable';

import { studentEditionModalClose, addStudent } from '../actions/students';

let modal = React.createClass({
    applyHandler() {
        const dispatch = this.props.dispatch;
        console.log(this.refs.firstName);
        dispatch(addStudent({
            firstName: this.refs.firstName.getValue(),
            lastName: this.refs.lastName.getValue(),
            formation: '562fe6b2e4ac121b545fa8a2'
        })).
        then(function () {
            dispatch(studentEditionModalClose());
        });
    },
    cancelHandler() {
        this.props.dispatch(studentEditionModalClose());
    },
    componentDidUpdate: function() {
        if (this.refs.firstName) {
            this.refs.firstName.getInputDOMNode().focus();
        }
    },
    render() {
        var dropDownButton = (
            <DropdownButton id="input-dropdown-addon" title="">
                {this.props.formations.map(formation => <MenuItem key={formation.get('id')}>{formation.get('title')}</MenuItem>)}
            </DropdownButton>
        );

        return (
            <Modal show={this.props.displayEditionModal} onHide={this.cancelHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='form-horizontal'>
                        <Input type='text' ref='firstName' label='First name' labelClassName="col-xs-3" wrapperClassName="col-xs-9" />
                        <Input type='text' ref='lastName' label='Last name' labelClassName="col-xs-3" wrapperClassName="col-xs-9" />
                        <Input type='text' ref='formation' label='Formation' labelClassName="col-xs-3" wrapperClassName="col-xs-9" buttonAfter={dropDownButton} />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle='primary' onClick={this.applyHandler}>Create</Button>
                    <Button bsStyle='danger' onClick={this.cancelHandler}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
});

function mapStateToProps(state) {
    return {
        displayEditionModal: state.getIn(['students', 'displayEditionModal'], false),
        formations: state.getIn(['formations', 'items'], List())
    };
}

export default connect(mapStateToProps)(modal);
