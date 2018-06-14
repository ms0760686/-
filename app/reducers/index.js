// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import test from './test';

const rootReducer = combineReducers({
  counter,
  test,
  router,
});

export default rootReducer;
