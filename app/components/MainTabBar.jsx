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
                <NavItem eventKey={1}>Students</NavItem>
                <NavItem eventKey={2}>Time slots</NavItem>
            </Nav>
        );
    }
}
