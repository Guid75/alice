'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon } from 'react-bootstrap';
import Formation from '../components/Formation.jsx';
import { Input, Panel } from 'react-bootstrap';
import { fetchStudents, filterStudents, removeStudent, studentEditionModalShow } from '../actions/students';
import { List } from 'immutable';

class Students extends React.Component {
    constructor(props) {
        super(props);
    }
    studentFilterChangeHandler(event) {
        this.props.dispatch(filterStudents(event.target.value));
    }
    removeUserHandler(id) {
        console.log(id);
        this.props.dispatch(removeStudent(id));
    }
    createUserHandler() {
        this.props.dispatch(studentEditionModalShow());
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
                    <Button bsStyle='primary' onClick={this.createUserHandler.bind(this)}>Create a student</Button>
                    <div className="container" style={{ paddingLeft: 0, paddingTop: 8 }}>
                        <div className='students-formations-container'>
                            {this.props.formations.map(formation => <Formation
                                key={formation.get('id')}
                                formation={formation}
                                students={this.props.students}
                                studentFilter={this.props.filter}
                                removeStudentHandler={this.removeUserHandler.bind(this)}
                                /> )}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
// <Panel header=<b>1ere Agri</b>>
//     {this.props.isFetching ?
//         <span>Fetching students...</span> : this.props.students.filter(this.filterStudent.bind(this)).map(student => <Student key={student.get('id')} student={student} removeHandler={this.removeUserHandler.bind(this)}/>)
//         }
// </Panel>
// <Panel header=<b>Seconde Horti</b>>
//     {this.props.isFetching ?
//         <span>Fetching students...</span> : this.props.students.filter(this.filterStudent.bind(this)).map(student => <Student key={student.get('id')} student={student} removeHandler={this.removeUserHandler.bind(this)}/>)
//         }
// </Panel>
// <Panel header=<b>Terminale Herboristerie</b>>
//     {this.props.isFetching ?
//         <span>Fetching students...</span> : this.props.students.filter(this.filterStudent.bind(this)).map(student => <Student key={student.get('id')} student={student} removeHandler={this.removeUserHandler.bind(this)}/>)
//     }
// </Panel>
// <Panel header=<b>pouet</b>>
//     {this.props.isFetching ?
//         <span>Fetching students...</span> : this.props.students.filter(this.filterStudent.bind(this)).map(student => <Student key={student.get('id')} student={student} removeHandler={this.removeUserHandler.bind(this)}/>)
//     }
// </Panel>

function mapStateToProps(state) {
  return {
      formations: state.getIn(['formations', 'items'], List()),
      students: state.getIn(['students', 'items'], List()),
      filter: state.getIn(['students', 'filter'], ''),
      isFetching: state.getIn(['students', 'isFetching'], false)
  };
}

export default connect(mapStateToProps)(Students);
