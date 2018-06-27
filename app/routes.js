/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import ManagementPage from './containers/ManagementPage';
import MemberPage from './containers/MemberPage';

export default () => (
  <App>
    <Switch>
      <Route path="/management" component={ManagementPage} />
      <Route path="/member" component={MemberPage} />
      <Route path="/counter" component={CounterPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
