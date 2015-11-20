'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SplitButton, MenuItem, Input, Panel, Button, Glyphicon } from 'react-bootstrap';
import Formation from '../components/Formation.jsx';
import * as studentActionCreators from '../actions/students';
import { removeFormation } from '../actions/formations';
import { List } from 'immutable';

class Students extends React.Component {
    constructor(props) {
        super(props);
    }
    studentFilterChangeHandler(event) {
        this.props.studentActions.filterStudents(event.target.value);
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
    selectAction(event, action) {
        switch (action) {
            case 'csv':
                this.props.studentActions.studentCSVModalShow();
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
                <form className='navbar-form navbar-left' role='search'>
                    <div className='form-group'>
                        <input type='text' className='form-control' placeholder='Search' value={this.props.filter} onChange={this.studentFilterChangeHandler.bind(this)}/>
                    </div>
                    <SplitButton bsStyle='primary' title='Create a student' onClick={this.props.studentActions.studentEditionModalShow} >
                        <MenuItem eventKey='csv' onSelect={this.selectAction.bind(this)}>Import students</MenuItem>
                    </SplitButton>
                    <div className='container' style={{ paddingLeft: 0, paddingTop: 8 }}>
                        <div className='students-formations-container'>
                            {this.props.formations.map(formation => <Formation
                                key={formation.get('id')}
                                studentActions={this.props.studentActions}
                                formation={formation}
                                students={this.props.students}
                                studentFilter={this.createStudentsFilter(formation)}
                                filter={this.props.filter}
/*                                importStudentsChangeFormation={this.props.importStudentsChangeFormation}
                                removeStudentHandler={this.props.removeStudent}
                             studentCSVModalShow={this.props.studentCSVModalShow}*/
                                removeFormationHandler={this.props.removeFormation}
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

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActionCreators, dispatch),
        removeFormation: bindActionCreators(removeFormation, dispatch)
    }
//    return bindActionCreators(studentActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);
