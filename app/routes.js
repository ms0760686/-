/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import TestPage from './containers/TestPage';

export default () => (
  <App>
    <Switch>
      <Route path="/test" component={TestPage} />
      <Route path="/counter" component={CounterPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
