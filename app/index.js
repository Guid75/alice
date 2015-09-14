'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App.jsx';
import configureStore from './store/configureStore';

const store = configureStore();

var rootInstance = React.render(
    <Provider store={store}>
        {() => <App />}
    </Provider>,
    document.getElementById('app')
);

if (module.hot) {
  require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
    getRootInstances: function () {
      // Help React Hot Loader figure out the root component instances on the page:
      return [rootInstance];
    }
  });
}
