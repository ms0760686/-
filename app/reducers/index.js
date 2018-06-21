// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import management from './management';

const rootReducer = combineReducers({
  counter,
  management,
  router,
});

export default rootReducer;
