'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, DropdownButton, MenuItem } from 'react-bootstrap';
import { List } from 'immutable';

import { studentEditionModalClose, addStudent } from '../actions/students';

let modal = React.createClass({
    getInitialState() {
        return {
            firstName: '',
            lastName: '',
            formation: '',
            formationId: ''
        };
    },
    applyHandler() {
        const dispatch = this.props.dispatch;
        dispatch(addStudent({
            firstName: this.refs.firstName.getValue(),
            lastName: this.refs.lastName.getValue(),
            formation: this.state.formationId
        })).
        then(function () {
            dispatch(studentEditionModalClose());
        });
    },
    cancelHandler() {
        this.props.dispatch(studentEditionModalClose());
    },
    formationSelected(e, id) {
        const formation = this.props.formations.find(formation => formation.get('id') === id);
        this.setState({
            formation: formation.get('title'),
            formationId: formation.get('id')
        });
    },
    componentDidUpdate: function() {
        if (this.refs.firstName) {
            this.refs.firstName.getInputDOMNode().focus();
        }
    },
    render() {
        var dropDownButton = (
            <DropdownButton id="input-dropdown-addon" title="">
                {this.props.formations.map(formation => <MenuItem eventKey={formation.get('id')} key={formation.get('id')} onSelect={this.formationSelected}>{formation.get('title')}</MenuItem>)}
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
                        <Input type='text' ref='formation' value={this.state.formation} label='Formation' labelClassName="col-xs-3" wrapperClassName="col-xs-9" buttonAfter={dropDownButton} />
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
