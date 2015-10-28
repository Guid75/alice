'use strict';

import React from 'react';
import { Button, Glyphicon, Panel } from 'react-bootstrap';

import Student from './Student.jsx';

export default class Formation extends React.Component {
    constructor(props) {
        super(props);
    }
    filterStudent(student) {
        var filter = this.props.studentFilter.toUpperCase();
        return student.get('formation') === this.props.formation.get('id') &&
            (student.get('firstName').toUpperCase().indexOf(filter) >= 0 ||
            student.get('lastName').toUpperCase().indexOf(filter) >= 0 ||
            (student.get('firstName') + ' ' + student.get('lastName')).toUpperCase().indexOf(filter) >= 0);
    }
    removeUserHandler() {
        console.log('remove user');
    }
    render() {
        return (
            <Panel header=<b>{this.props.formation.get('title')}</b>>
                {this.props.students.filter(this.filterStudent.bind(this)).map((student) => {
                    return <Student key={student.get('id')} student={student} removeHandler={this.removeUserHandler.bind(this)}/>
                })}
            </Panel>
        );
    }
    // {this.props.isFetching ?
    //     <span>Fetching students...</span> : this.props.students.filter(this.filterStudent.bind(this)).map(student => <Student key={student.get('id')} student={student} removeHandler={this.removeUserHandler.bind(this)}/>)
    //     }
}

Student.propTypes = {
    formation: React.PropTypes.object.isRequired,
    students: React.PropTypes.object.isRequired,
    studentFilter: React.PropTypes.string.isRequired,
};
