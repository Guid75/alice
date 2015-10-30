'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, DropdownButton, MenuItem } from 'react-bootstrap';
import { List } from 'immutable';

import { studentEditionModalClose, addStudent } from '../actions/students';
import { addFormation } from '../actions/formations';

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

        const formation = this.props.formations.find(formation => formation.get('title') === this.state.formation);
        if (!formation) {
            dispatch(addFormation({
                title: this.state.formation
            }))
            .then(formation =>  {
                dispatch(addStudent({
                    firstName: this.refs.firstName.getValue(),
                    lastName: this.refs.lastName.getValue(),
                    formation: formation.id
                }));
            })
            .then(() => {
                dispatch(studentEditionModalClose());
            });
            return;
        }

        dispatch(addStudent({
            firstName: this.refs.firstName.getValue(),
            lastName: this.refs.lastName.getValue(),
            formation: formation.get('id')
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
    formationChangeHandler(e) {
        this.setState({
            formation: e.target.value
        });
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
                        <Input type='text' ref='firstName' autoFocus label='First name' labelClassName="col-xs-3" wrapperClassName="col-xs-9" />
                        <Input type='text' ref='lastName' label='Last name' labelClassName="col-xs-3" wrapperClassName="col-xs-9" />
                        <Input type='text' ref='formation' value={this.state.formation} onChange={this.formationChangeHandler} label='Formation' labelClassName="col-xs-3" wrapperClassName="col-xs-9" buttonAfter={dropDownButton} />
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
