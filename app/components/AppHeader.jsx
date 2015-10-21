'use strict';

import React from 'react';
import { Navbar, NavBrand } from 'react-bootstrap';

export default class User extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<Navbar fluid={true} style={{ marginBottom: 10 }}>
                <NavBrand>ALICE workshops</NavBrand>
            </Navbar>
        );
    }
};
