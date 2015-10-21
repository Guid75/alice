'use strict';

import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

export default class User extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<Tabs activeKey={this.props.currentTab} onSelect={this.props.handleTabSelect}>
                <Tab eventKey={1} title="Students">Students</Tab>
                <Tab eventKey={2} title="Time slots">Time slots</Tab>
            </Tabs>
        );
    }
}
