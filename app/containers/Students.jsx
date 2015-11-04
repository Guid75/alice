'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { SplitButton, MenuItem, Input, Panel, Button, Glyphicon } from 'react-bootstrap';
import Formation from '../components/Formation.jsx';
import { fetchStudents, filterStudents, removeStudent,
    studentEditionModalShow, studentCSVModalShow } from '../actions/students';
import { removeFormation } from '../actions/formations';
import { List } from 'immutable';

class Students extends React.Component {
    constructor(props) {
        super(props);
    }
    studentFilterChangeHandler(event) {
        this.props.dispatch(filterStudents(event.target.value));
    }
    removeUserHandler(id) {
        this.props.dispatch(removeStudent(id));
    }
    removeFormationHandler(id) {
        this.props.dispatch(removeFormation(id));
    }
    createUserHandler() {
        this.props.dispatch(studentEditionModalShow());
    }
    createStudentsFilter(formation) {
        return student => {
            var filter = this.props.filter.toUpperCase();
            return student.get('formation') === formation.get('id') &&
                (student.get('firstName').toUpperCase().indexOf(filter) >= 0 ||
                student.get('lastName').toUpperCase().indexOf(filter) >= 0 ||
                (student.get('firstName') + ' ' + student.get('lastName')).toUpperCase().indexOf(filter) >= 0);
        };
    }
    formationFilter(formation) {
        return true;
//        return this.props.students.filter(this.createStudentsFilter(formation)).size > 0;
    }
    selectAction(event, action) {
        switch (action) {
            case 'csv':
            this.props.dispatch(studentCSVModalShow());
            break;
            default:
            break;
        }
    }
    render() {
        const filterStyle = {
            width: 400,
            marginLeft: 4
        };
        return (
            <div>
                <form className="navbar-form navbar-left" role="search">
                    <div className='form-group'>
                        <input type="text" className="form-control" placeholder="Search" value={this.props.filter} onChange={this.studentFilterChangeHandler.bind(this)}/>
                    </div>
                    <SplitButton bsStyle='primary' title='Create a student' onClick={this.createUserHandler.bind(this)} >
                        <MenuItem eventKey="csv" onSelect={this.selectAction.bind(this)}>Import students</MenuItem>
                    </SplitButton>
                    {/*<Button bsStyle='primary' onClick={this.createUserHandler.bind(this)}>Create a student</Button>*/}
                    <div className="container" style={{ paddingLeft: 0, paddingTop: 8 }}>
                        <div className='students-formations-container'>
                            {this.props.formations.filter(this.formationFilter.bind(this)).map(formation => <Formation
                                key={formation.get('id')}
                                formation={formation}
                                dispatch={this.props.dispatch}
                                students={this.props.students}
                                studentFilter={this.createStudentsFilter(formation)}
                                filter={this.props.filter}
                                removeStudentHandler={this.removeUserHandler.bind(this)}
                                removeFormationHandler={this.removeFormationHandler.bind(this)}
                                /> )}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
      formations: state.getIn(['formations', 'items'], List()),
      students: state.getIn(['students', 'items'], List()),
      filter: state.getIn(['students', 'filter'], ''),
      isFetching: state.getIn(['students', 'isFetching'], false)
  };
}

export default connect(mapStateToProps)(Students);
