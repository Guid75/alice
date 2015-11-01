'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, DropdownButton, MenuItem } from 'react-bootstrap';
import { List } from 'immutable';
import Loader from 'react-loader';
import { studentCSVModalClose } from '../actions/students';

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
        const formation = this.props.formations.find(formation => formation.get('title') === this.state.formation);
        let p;

        this.setState({
            saving: true
        });

        if (!formation) {
            p = dispatch(addFormation({
                title: this.state.formation
            }));
        } else {
            p = Promise.resolve({ id: formation.get('id') });
        }

        p.then(formation =>  {
            dispatch(addStudent({
                firstName: this.refs.firstName.getValue(),
                lastName: this.refs.lastName.getValue(),
                formation: formation.id
            }));
        })
        .then(() => {
            dispatch(studentEditionModalClose());
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
                        <Input type='textarea' style={textAreaStyle} ref='csv' autoFocus label='CSV' labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Loader loaded={!this.state.saving}>
                    </Loader>
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
