'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, DropdownButton, MenuItem } from 'react-bootstrap';
import { List } from 'immutable';
import Loader from 'react-loader';
import { workshopEditionModalClose, addWorkshop } from '../actions/workshops';

require('promise.prototype.finally');

let modal = React.createClass({
    getInitialState() {
        return {
            // firstName: '',
            // lastName: '',
            teacherId: '',
            teacher: '',
            saving: false
        };
    },
    applyHandler() {
        const dispatch = this.props.dispatch;
        let p;

        if (!this.state.teacherId) {
            return;
        }

        this.setState({
            saving: true
        });

        dispatch(addWorkshop({
            title: this.refs.title.getValue(),
            teacher: this.state.teacherId
        }))
        .then(() => {
            dispatch(workshopEditionModalClose());
        })
        .finally(() => {
            this.setState({
                saving: false
            });
        });
    },
    cancelHandler() {
        this.props.dispatch(workshopEditionModalClose());
    },
    teacherSelected(e, id) {
        const teacher = this.props.teachers.find(teacher => teacher.get('id') === id);
        this.setState({
            teacherId: id,
            teacher: teacher.get('firstName') + ' ' + teacher.get('lastName')
        });
    },
    teacherChangeHandler(e) {
        this.setState({
            teacher: e.target.value
        });
    },
    render() {
        var dropDownButton = (
            <DropdownButton id="input-dropdown-addon" title="">
                {this.props.teachers.map(teacher => <MenuItem eventKey={teacher.get('id')} key={teacher.get('id')} onSelect={this.teacherSelected}>{teacher.get('firstName') + ' ' + teacher.get('lastName')}</MenuItem>)}
            </DropdownButton>
        );

        return (
            <Modal show={this.props.displayEditionModal} onHide={this.cancelHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a workshop</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='form-horizontal'>
                        <Input type='text' ref='title' autoFocus label='Title' labelClassName="col-xs-3" wrapperClassName="col-xs-9" />
                        <Input type='text' ref='teacher' value={this.state.teacher} onChange={this.teacherChangeHandler} label='Teacher' labelClassName="col-xs-3" wrapperClassName="col-xs-9" buttonAfter={dropDownButton}/>
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
        displayEditionModal: state.getIn(['workshops', 'displayEditionModal'], false),
        teachers: state.getIn(['teachers', 'items'], List())
    };
}

export default connect(mapStateToProps)(modal);
