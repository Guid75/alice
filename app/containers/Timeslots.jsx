'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { fetchStudents, filterStudents, addStudent, removeStudent } from '../actions';
import { List } from 'immutable';

class Timeslots extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                TODO: display timeslots
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(Timeslots);
