'use strict';

import React, { Component } from 'react';
import { Button, Glyphicon }  from 'react-bootstrap';

import commonStyles from '../common.css';
import styles from './WorkshopMenuItem.css';

export class WorkshopMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false
        };
    }
    mouseOver() {
        this.setState({hover: true});
    }
    mouseOut() {
        this.setState({hover: false});
    }
    render() {
        const spanStyle = {
            flex: 1
        };
        const buttonStyle = {
            paddingRight: '4px'
        };
        return (
            <div className={styles.main} onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseOut.bind(this)}>
                <span style={spanStyle}>{this.props.workshop.get('title')}</span>
            {this.state.hover ?
                <Button bsStyle='danger' bsSize='xsmall' style={buttonStyle}><Glyphicon glyph="remove" /></Button> : null}
            </div>
        );
    }
};

WorkshopMenuItem.propTypes = {
    workshop: React.PropTypes.object.isRequired
};
