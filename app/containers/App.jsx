'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { selectTab } from '../actions';
import { fetchStudents } from '../actions/students';
import { fetchTeachers } from '../actions/teachers';
import { fetchFormations } from '../actions/formations';
import { fetchWorkshops } from '../actions/workshops';
import { List, Map, fromJS } from 'immutable';
import { Modal, Button, Input } from 'react-bootstrap';

import Students from './Students.jsx';
import Teachers from './Teachers.jsx';
import Timeslots from './Timeslots.jsx';
import Workshops from './Workshops.jsx';
import TeacherEditionModal from './TeacherEditionModal.jsx';
import StudentEditionModal from './StudentEditionModal.jsx';
import StudentCSVModal from './StudentCSVModal.jsx';
import WorkshopEditionModal from './WorkshopEditionModal.jsx';
import AppHeader from '../components/AppHeader.jsx';
import MainTabBar from '../components/MainTabBar.jsx';

var App = React.createClass({
    componentDidMount() {
        this.props.dispatch(fetchStudents());
        this.props.dispatch(fetchTeachers());
        this.props.dispatch(fetchFormations());
        this.props.dispatch(fetchWorkshops());
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
            case 'workshops':
            mainContain = <Workshops />;
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
                <div>
                    <MainTabBar currentTab={this.props.currentTab} handleTabSelect={this.handleTabSelect}/>
                    {mainContain}
                </div>
                <TeacherEditionModal/>
                <StudentEditionModal/>
                <StudentCSVModal/>
                <WorkshopEditionModal/>
            </div>
        );
    }
});

function mapStateToProps(state) {
  return {
      currentTab: state.get('currentTab')
  };
}

export default connect(mapStateToProps)(App);
