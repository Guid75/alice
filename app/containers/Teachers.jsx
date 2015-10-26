'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Button, Navbar, Glyphicon, Input,
    Panel, FormGroup, Modal, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import Teacher from '../components/Teacher.jsx';
import { filterTeachers, addTeacher, removeTeacher, requestTeacherEditionModal } from '../actions/teachers';
import { List } from 'immutable';

class Teachers extends React.Component {
    constructor(props) {
        super(props);
    }
    teacherFilterChangeHandler(event) {
        this.props.dispatch(filterTeachers(event.target.value));
    }
    removeTeacherHandler(id) {
        this.props.dispatch(removeTeacher(id));
    }
    filterTeacher(teacher) {
        return teacher.get('firstName').toUpperCase().indexOf(this.props.filter.toUpperCase()) >= 0 ||
        teacher.get('lastName').toUpperCase().indexOf(this.props.filter.toUpperCase()) >= 0 ||
        (teacher.get('firstName') + ' ' + teacher.get('lastName')).toUpperCase().indexOf(this.props.filter.toUpperCase()) >= 0;
    }
    createTeacherHandler() {
        this.props.dispatch(requestTeacherEditionModal());
    }
    render() {
        return (
            <div>
                <form className="navbar-form navbar-left" role="search">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search" value={this.props.filter} onChange={this.teacherFilterChangeHandler.bind(this)}/>
                    </div>
                    <Button bsStyle='primary' onClick={this.createTeacherHandler.bind(this)}>Create a teacher</Button>
                    <div className="container" style={{ paddingLeft: 0, paddingTop: 8 }}>
                        {this.props.isFetching ?
                            <span>Fetching teachers...</span> : this.props.teachers.filter(this.filterTeacher.bind(this)).map(teacher => <Teacher key={teacher.get('id')} teacher={teacher} removeHandler={this.removeTeacherHandler.bind(this)}/>)
                            }
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
      teachers: state.getIn(['teachers', 'items'], List()),
      filter: state.getIn(['teachers', 'filter'], ''),
      isFetching: state.getIn(['teachers', 'isFetching'], false)
  };
}

export default connect(mapStateToProps)(Teachers);
