'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input } from 'react-bootstrap';

import { studentEditionModalClose, addStudent } from '../actions/students';

let modal = React.createClass({
    applyHandler() {
        const dispatch = this.props.dispatch;
        console.log(this.refs.firstName);
        dispatch(addStudent({
            firstName: this.refs.firstName.getValue(),
            lastName: this.refs.lastName.getValue()
        })).
        then(function () {
            dispatch(studentEditionModalClose());
        });
    },
    cancelHandler() {
        this.props.dispatch(studentEditionModalClose());
    },
    componentDidUpdate: function() {
        this.refs.firstName.getInputDOMNode().focus();
    },
    render() {
        return (
            <Modal show={this.props.displayEditionModal} onHide={this.cancelHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal">
                        <Input type="text" ref='firstName' label="First name" labelClassName="col-xs-3" wrapperClassName="col-xs-9" />
                        <Input type="text" ref='lastName' label="Last name" labelClassName="col-xs-3" wrapperClassName="col-xs-9" />
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
      displayEditionModal: state.getIn(['students', 'displayEditionModal'], false)
  };
}

export default connect(mapStateToProps)(modal);
