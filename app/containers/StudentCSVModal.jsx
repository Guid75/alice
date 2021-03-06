'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, DropdownButton, MenuItem } from 'react-bootstrap';
import { List } from 'immutable';
import Loader from 'react-loader';
import { studentCSVModalClose, importStudents, importStudentsChangeFormation } from '../actions/students';

require('promise.prototype.finally');

let modal = React.createClass({
    getInitialState() {
        return {
            firstName: '',
            lastName: '',
            saving: false
        };
    },
    applyHandler() {
        const dispatch = this.props.dispatch;
        let files;
        let that = this;

        this.setState({
            saving: true
        });

        dispatch(importStudents(this.refs.csv.getValue(), that.props.csvModalFormation))
        .then(() => {
            dispatch(studentCSVModalClose());
        })
        .finally(() => {
            that.setState({
                saving: false
            });
        });
    },
    cancelHandler() {
        this.props.dispatch(studentCSVModalClose());
    },
    formationSelected(e, id) {
        const formation = this.props.formations.find(formation => formation.get('id') === id);
        this.props.dispatch(importStudentsChangeFormation(formation.get('title')));
    },
    formationChangeHandler(e) {
        console.log('change handler');
        this.props.dispatch(importStudentsChangeFormation(e.target.value));
    },
    fillArea() {
        this.refs.csv.getInputDOMNode().value = 'Guillaume;Denry;Terminal Agri\nVincent;Denry;1ere Horti\nBenoit;Denry;Terminal Agri\n'
    },
    onFileUploadChange() {
        const that = this;
        const files = this.refs.fileUpload.getInputDOMNode().files;
        if (files.length > 0) {
            let reader = new FileReader();
            let file = files[0];

            reader.onload = function(upload) {
                let csv;
                csv = atob(upload.target.result.split(',')[1]);
                that.refs.csv.getInputDOMNode().value = csv;
            }
            reader.readAsDataURL(file);
        }
    },
    render() {
        const textAreaStyle = {
            height: '15em'
        };
        const dropDownButton = (
            <DropdownButton id="input-dropdown-addon" title="">
                {this.props.formations.map(formation => <MenuItem eventKey={formation.get('id')} key={formation.get('id')} onSelect={this.formationSelected}>{formation.get('title')}</MenuItem>)}
            </DropdownButton>
        );
        return (
            <Modal show={this.props.displayCSVModal} onHide={this.cancelHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Import students</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='form-horizontal'>
                        <Input
                            type='textarea'
                            style={textAreaStyle}
                            ref='csv'
                            autoFocus
                            label='Copy your CSV here'
                            labelClassName='col-xs-2' wrapperClassName='col-xs-10'
                            help='firstname;lastname'/>
                        <Input
                            type='file'
                            label='Or upload one'
                            labelClassName='col-xs-2' wrapperClassName='col-xs-10'
                            ref='fileUpload'
                            onChange={this.onFileUploadChange}
                            />
                        <Input
                            type='text'
                            ref='formation'
                            value={this.props.csvModalFormation}
                            onChange={this.formationChangeHandler}
                            label='Formation'
                            labelClassName="col-xs-2" wrapperClassName="col-xs-10"
                            buttonAfter={dropDownButton}
                            help={!this.props.csvModalFormation || this.props.formations.find(formation => formation.get('title') === this.props.csvModalFormation) ? undefined : "This formation is new and will be created"}
                            />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Loader loaded={!this.state.saving}>
                    </Loader>
                    <Button bsStyle='default' className='pull-left' onClick={this.fillArea}>Fill area with dummy data</Button>
                    <Button bsStyle='primary' onClick={this.applyHandler}>Import</Button>
                    <Button bsStyle='default' onClick={this.cancelHandler}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
});

function mapStateToProps(state) {
    return {
        displayCSVModal: state.getIn(['students', 'displayCSVModal'], false),
        csvModalFormation: state.getIn(['students', 'csvModalFormation'], ''),
        formations: state.getIn(['formations', 'items'], List())
    };
}

export default connect(mapStateToProps)(modal);
