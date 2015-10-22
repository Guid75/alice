'use strict';

require('../stylesheets/styles.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App.jsx';
import configureStore from './store/configureStore';

const store = configureStore();

var rootInstance = ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
