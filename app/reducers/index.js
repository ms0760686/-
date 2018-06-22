// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import management from './management';
import login from './login';

const rootReducer = combineReducers({
  counter,
  management,
  login,
  router,
});

export default rootReducer;
