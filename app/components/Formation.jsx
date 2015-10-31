'use strict';

import React from 'react';
import { Button, Glyphicon, Panel } from 'react-bootstrap';

import Student from './Student.jsx';

export default class Formation extends React.Component {
    constructor(props) {
        super(props);
    }
    removeUserHandler() {
        console.log('remove user');
    }
    studentFormationFilter(student) {
        return student.get('formation') === this.props.formation.get('id');
    }
    render() {
        return (
            <Panel header=<b>{this.props.formation.get('title')}</b>>
                {this.props.students.filter(this.studentFormationFilter.bind(this)).map((student) => {
                    return <Student key={student.get('id')} student={student} grayed={!this.props.studentFilter(student)} removeHandler={this.props.removeStudentHandler}/>
                })}
            </Panel>
        );
    }
    // {this.props.isFetching ?
    //     <span>Fetching students...</span> : this.props.students.filter(this.filterStudent.bind(this)).map(student => <Student key={student.get('id')} student={student} removeHandler={this.removeUserHandler.bind(this)}/>)
    //     }
}

Formation.propTypes = {
    formation: React.PropTypes.object.isRequired,
    students: React.PropTypes.object.isRequired,
    studentFilter: React.PropTypes.func.isRequired
};
