// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import management from './management';
import member from './member';
import login from './login';

const rootReducer = combineReducers({
  counter,
  management,
  member,
  login,
  router,
});

export default rootReducer;
