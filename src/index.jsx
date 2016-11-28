import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './components/App';
import Repos from './components/Repos';
import store from './state/store';

// Route config
const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Repos} />
  </Route>
);

// Render
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.querySelector('.mount')
);
