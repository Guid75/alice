'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Button, Row, Glyphicon } from 'react-bootstrap';
import Formation from '../components/Formation.jsx';
import { workshopEditionModalShow } from '../actions/workshops';
import { removeFormation } from '../actions/formations';
import { List } from 'immutable';

import styles from './Workshops.css';

class Workshops extends React.Component {
    constructor(props) {
        super(props);
    }
    createWorkshopHandler() {
        this.props.dispatch(workshopEditionModalShow());
    }
    render() {
        const workshopLinks = this.props.workshops.map(workshop => <span>{workshop.get('title')}</span>);
        return (
            <div className={styles.main}>
                <div className={styles.header}>
                    <Button bsStyle='primary' onClick={this.createWorkshopHandler.bind(this)}><Glyphicon glyph="plus"/> New workshop</Button>
                </div>

                <div className={styles.wrapper}>
                    <nav className={styles.nav} id="navigation" role="navigation">
                        {workshopLinks}
                    </nav>
                    <div className={styles.section + ' ' + styles.content}>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
      formations: state.getIn(['formations', 'items'], List()),
      students: state.getIn(['students', 'items'], List()),
      workshops: state.getIn(['workshops', 'items'], List())
  };
}

export default connect(mapStateToProps)(Workshops);
