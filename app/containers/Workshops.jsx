'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Button, Row, Glyphicon } from 'react-bootstrap';
import Formation from '../components/Formation.jsx';
import { workshopEditionModalShow } from '../actions/workshops';
import { removeFormation } from '../actions/formations';
import { List } from 'immutable';

class Workshops extends React.Component {
    constructor(props) {
        super(props);
    }
    createWorkshopHandler() {
        this.props.dispatch(workshopEditionModalShow());
    }
    render() {
        return (
            <div>
                <Row style={{ margin: 8 }}>
                    <Button bsStyle='primary' onClick={this.createWorkshopHandler.bind(this)}><Glyphicon glyph="plus"/> New workshop</Button>
                </Row>
                <div className='container-fluid' style={{ marginTop: '8'}}>
                    <ListGroup style={{ width: 200, height: 800 }}>
                        {this.props.workshops.map(workshop => <ListGroupItem href="#">{workshop.get('title')}</ListGroupItem>)}
                    </ListGroup>
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
