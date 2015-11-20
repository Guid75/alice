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
    // render() {
    //     return (
    //         <div>
    //             <Row style={{ margin: 8 }}>
    //                 <Button bsStyle='primary' onClick={this.createWorkshopHandler.bind(this)}><Glyphicon glyph="plus"/> New workshop</Button>
    //             </Row>
    //             <div className='container-fluid' style={{ marginTop: '8'}}>
    //                 <ListGroup style={{ width: 200, height: 800 }}>
    //                     {this.props.workshops.map(workshop => <ListGroupItem href="#">{workshop.get('title')}</ListGroupItem>)}
    //                 </ListGroup>
    //             </div>
    //         </div>
    //     );
    // }
    render() {
        return (
            <div className={styles.main}>
                <div className={styles.header}>
                    <h1>I do love my Knacky balls !</h1>
                </div>

                <div className={styles.wrapper}>
                    <div className={styles.nav} id="navigation" role="navigation">
                        <a href="#">Salade</a>
                        <a href="#">Tomate</a>
                        <a href="#">Oignon</a>
                        <a href="#">Choucroute</a>
                        <a href="#">Picon biere</a>
                    </div>
                    <div className={styles.section + ' ' + styles.content}>
                        <h2>Flexbox c'est la vie, Hopla !</h2>
                        <p><code>flex: 1;</code></p>
                        <p>Lorem Elsass ipsum lacus leverwurscht Wurschtsalad mamsell Gal. gewurztraminer turpis, suspendisse commodo Oberschaeffolsheim ornare aliquam semper Miss Dahlias Mauris turpis sagittis kuglopf eleifend dignissim baeckeoffe geht's Richard Schirmeck mollis habitant schnaps ante et sit leo schpeck sit Salu bissame Salut bisamme varius quam. amet elementum nullam bissame bredele Heineken picon biere gal sed risus, condimentum Verdammi ch'ai ac rechime meteor barapli s'guelt quam, non Christkindelsmarik blottkopf, Carola tellus rucksack vielmols, Gal !</p>
                    </div>
                </div>

                <div className={styles.footer} >Hopla le pied de pache !</div>
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
