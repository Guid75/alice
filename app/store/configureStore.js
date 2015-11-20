'use strict';

import { fromJS } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(
    thunk/*,
    logger*/
)(createStore);

export default function configureStore() {
    const initialState = fromJS({
        students: {
            isFetching: false,
            items: [],
            filter: ''
        },
        teachers: {
            isFetching: false,
            items: [],
            filter: ''
        },
        formations: {
            isFetching: false,
            items: [],
            filter: ''
        },
        workshops: {
            isFetching: false,
            items: []
        },
        currentTab: 'students'
    });

    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
