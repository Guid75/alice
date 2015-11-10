'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Formation from '../components/Formation.jsx';
import { fetchStudents, filterStudents, removeStudent,
    studentEditionModalShow, studentCSVModalShow } from '../actions/students';
import { removeFormation } from '../actions/formations';
import { List } from 'immutable';

class Workshops extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='container-fluid' style={{ marginTop: '8'}}>
                <ListGroup style={{ width: 200, height: 800 }}>
                    <ListGroupItem href='#'>05/11/2015, 10:45-11:45</ListGroupItem>
                    <ListGroupItem href='#'>05/11/2015, 11:45-12:45</ListGroupItem>
                    <ListGroupItem href='#'>12/11/2015, 11:45-12:45</ListGroupItem>
                </ListGroup>
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

export default connect(mapStateToProps)(Workshops);
