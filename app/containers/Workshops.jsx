'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { SplitButton, MenuItem, Input, Panel, Button, Glyphicon } from 'react-bootstrap';
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
            <div>
                Display workshops here
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
