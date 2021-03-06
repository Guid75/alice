'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input } from 'react-bootstrap';

import { teacherEditionModalClose, addTeacher } from '../actions/teachers';

let modal = React.createClass({
    applyHandler() {
        const dispatch = this.props.dispatch;
        dispatch(addTeacher({
            firstName: this.refs.firstName.getValue(),
            lastName: this.refs.lastName.getValue()
        })).
        then(function () {
            dispatch(teacherEditionModalClose());
        });
    },
    cancelHandler() {
        this.props.dispatch(teacherEditionModalClose());
    },
    render() {
        return (
            <Modal show={this.props.displayEditionModal} onHide={this.cancelHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a teacher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal">
                        <Input type="text" ref='firstName' autoFocus label="First name" labelClassName="col-xs-3" wrapperClassName="col-xs-9" />
                        <Input type="text" ref='lastName' label="Last name" labelClassName="col-xs-3" wrapperClassName="col-xs-9" />
                        <Input type="checkbox" label="Create an ALICE account for this teacher" wrapperClassName="col-xs-offset-3 col-xs-9" checked />
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
      displayEditionModal: state.getIn(['teachers', 'displayEditionModal'], false)
  };
}

export default connect(mapStateToProps)(modal);
