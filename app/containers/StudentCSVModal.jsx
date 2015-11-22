'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Dialog, TextField, FlatButton, RaisedButton,
    Checkbox, SelectField, DatePicker, TimePicker, AutoComplete } from 'material-ui';
import { List } from 'immutable';
import Loader from 'react-loader';
import { studentCSVModalClose, importStudents, importStudentsChangeFormation } from '../actions/students';

require('promise.prototype.finally');

let modal = React.createClass({
    getInitialState() {
        return {
            saving: false,
            formation: ''
        };
    },
    caseInsensitiveCompare(str1, str2) {
        str1 = str1 || '';
        str2 = str2 || '';
        return str1.toUpperCase() === str2.toUpperCase();
    },
    normalizedCurrentFormationTitle() {
        const title = this.state.formation;
        const formation = this.props.formations.find(formation => this.caseInsensitiveCompare(formation.get('title'), title));
        if (formation) {
            return formation.get('title');
        }
        // unknown formation? Trust the title case provided
        return this.state.formation;
    },
    applyHandler() {
        const dispatch = this.props.dispatch;
        const that = this;

        this.setState({
            saving: true
        });

        dispatch(importStudents(this.refs.csv.getValue(), this.normalizedCurrentFormationTitle()))
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
    onFileUploadChange() {
        const that = this;
        const files = this.refs.fileUpload.files;
        if (files.length > 0) {
            let reader = new FileReader();
            let file = files[0];

            reader.onload = function(upload) {
                let csv;
                csv = atob(upload.target.result.split(',')[1]);
                that.refs.csv.setValue(csv);
            }
            reader.readAsDataURL(file);
        }
    },
    _openFileDialog() {
        var fileUploadDom = React.findDOMNode(this.refs.fileUpload);
        fileUploadDom.click();
    },
    onFormationChanged(formation) {
        this.setState({
            formation: formation
        });
    },
    currentFormationExists() {
        const title = this.state.formation;
        const formation = this.props.formations.find(formation => this.caseInsensitiveCompare(formation.get('title'), title));
        return Boolean(formation);
    },
    render() {
        const customActions = [
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this.applyHandler} />,
            <FlatButton
                label="Cancel"
                secondary={true}
                click={this._handleCustomDialogCancel}
                onTouchTap={this.cancelHandler} />
        ];
        const textAreaStyle = {
            height: '15em'
        };
        const autoComplete = (
            <AutoComplete
                fullWidth={true}
                floatingLabelText="Formation"
                showAllItems={true}
                animated={false}
                showAllItems={true}
                onUpdateInput={this.onFormationChanged}
                onNewRequest={this.onFormationChanged}
                dataSource = {this.props.formations.map(formation => formation.get('title')).toJSON()}
                />
        );

        const formationCreationWarning = this.currentFormationExists() || !this.state.formation ? undefined : <div style={{ alignSelf: 'flex-end', fontSize: '0.8em' }}>This formation is new and will be created</div>;

        return (
            <Dialog
                title='Import students'
                autoDetectWindowHeight={true}
                autoScrollBodyContent={true}
                open={this.props.displayCSVModal}
                actions={customActions}>
                <form>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <TextField
                            floatingLabelText='Copy your CSV here'
                            fullWidth={true}
                            ref="csv"
                            multiLine={true}
            			    rows={3}
				            rowsMax={8}
                            />
                        <RaisedButton
                            label="Or upload a CSV file"
                            onClick={this._openFileDialog}/>
                        <input
                            ref="fileUpload"
                            type="file"
                            style={{"display" : "none"}}
                            onChange={this.onFileUploadChange}/>
                        {autoComplete}
                        <Loader loaded={!this.state.saving}/>
                        {formationCreationWarning}
                    </div>
                </form>
            </Dialog>
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
