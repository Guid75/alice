'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Students from './Students.jsx';
import AppHeader from '../components/AppHeader.jsx';
import MainTabBar from '../components/MainTabBar.jsx';
import { fetchStudents, selectTab } from '../actions';
import { List, Map, fromJS } from 'immutable';

var App = React.createClass({
    componentDidMount() {
        this.props.dispatch(fetchStudents());
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
            case 'timeslots':
            mainContain = <div/>;
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
            </div>
        );
    }
});

function mapStateToProps(state) {
  return {
      currentTab: state.get('currentTab') || 1
  };
}

export default connect(mapStateToProps)(App);
