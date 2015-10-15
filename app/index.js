'use strict';

require('../stylesheets/styles.scss');

import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App.jsx';
import configureStore from './store/configureStore';

const store = configureStore();

var rootInstance = React.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
