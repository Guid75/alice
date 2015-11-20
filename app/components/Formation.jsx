'use strict';

import styles from './Formation.css';

import React from 'react';
import { SplitButton, MenuItem, Button, Glyphicon, Panel } from 'react-bootstrap';
import { studentCSVModalShow, importStudentsChangeFormation } from '../actions/students';

import Student from './Student.jsx';

export default class Formation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false
        };
    }
    studentFormationFilter(student) {
        return student.get('formation') === this.props.formation.get('id');
    }
    mouseOver() {
        this.setState({hover: true});
    }
    mouseOut() {
        this.setState({hover: false});
    }
    selectAction(event, action) {
        switch (action) {
            case 'remove':
                this.props.removeFormationHandler(this.props.formation.get('id'));
                break;
            case 'import':
                this.props.studentsAction.importStudentsChangeFormation(this.props.formation.get('title'));
                this.props.studentsAction.studentCSVModalShow();
                break;
            default:
                break;
        }
    }
    renderHeader() {
        return <div><b>{this.props.formation.get('title')}</b>{this.state.hover ?
            <SplitButton bsStyle='primary' bsSize='xsmall' className='pull-right' title='Add student'>
                <MenuItem eventKey="import" onSelect={this.selectAction.bind(this)}>Import students</MenuItem>
                <MenuItem eventKey="remove" onSelect={this.selectAction.bind(this)}><Glyphicon glyph="remove" /> Remove this group</MenuItem>
            </SplitButton> : undefined}</div>;
    }
    render() {
        return (
            <Panel header={this.renderHeader.call(this)} onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseOut.bind(this)} className={styles.mainPanel}>
                {this.props.students.filter(this.studentFormationFilter.bind(this)).map((student) => {
                    return <Student key={student.get('id')} student={student} grayed={!this.props.studentFilter(student)} removeHandler={this.props.studentActions.removeStudent}/>
                })}
            </Panel>
        );
    }
}

Formation.propTypes = {
    formation: React.PropTypes.object.isRequired,
    students: React.PropTypes.object.isRequired,
    studentActions: React.PropTypes.object.isRequired,
    studentFilter: React.PropTypes.func.isRequired,
    removeFormationHandler: React.PropTypes.func.isRequired
};
