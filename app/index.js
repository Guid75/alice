'use strict';

import React from 'react';
import Hello from './components/component.jsx';
import jquery from 'jquery';

window.$ = jquery;

var rootInstance = React.render(<Hello />, document.getElementById('app'));

if (module.hot) {
  require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
    getRootInstances: function () {
      // Help React Hot Loader figure out the root component instances on the page:
      return [rootInstance];
    }
  });
}
