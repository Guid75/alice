'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents, selectTab } from '../actions';
import { fetchTeachers } from '../actions/teachers';
import { List, Map, fromJS } from 'immutable';
import { Modal, Button, Input } from 'react-bootstrap';

import Students from './Students.jsx';
import Teachers from './Teachers.jsx';
import Timeslots from './Timeslots.jsx';
import TeacherEditionModal from './TeacherEditionModal.jsx';
import AppHeader from '../components/AppHeader.jsx';
import MainTabBar from '../components/MainTabBar.jsx';

var App = React.createClass({
    componentDidMount() {
        this.props.dispatch(fetchStudents());
        this.props.dispatch(fetchTeachers());
    },
    handleTabSelect(key) {
        this.props.dispatch(selectTab(key));
    },
    render() {
        var mainContain;
        switch (this.props.currentTab) {
            case 'students':
            mainContain = <Students />;
            break;
            case 'teachers':
            mainContain = <Teachers />;
            break;
            case 'timeslots':
            mainContain = <Timeslots />;
            break;
            default:
            mainContain = <div>Should not happend</div>;
            break;
        }

        return (
            <div>
                <AppHeader />
                <MainTabBar currentTab={this.props.currentTab} handleTabSelect={this.handleTabSelect}/>
                {mainContain}
                <TeacherEditionModal/>
            </div>
        );
    }
});

function mapStateToProps(state) {
  return {
      currentTab: state.get('currentTab') || 1,
      displayEditionModal: state.getIn(['teachers', 'displayEditionModal'], false)
  };
}

export default connect(mapStateToProps)(App);
