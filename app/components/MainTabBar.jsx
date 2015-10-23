'use strict';

import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';

export default class User extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Nav bsStyle="tabs" activeKey={this.props.currentTab} onSelect={this.props.handleTabSelect}>
                <NavItem eventKey='students'>Students</NavItem>
                <NavItem eventKey='timeslots'>Time slots</NavItem>
            </Nav>
        );
    }
}
