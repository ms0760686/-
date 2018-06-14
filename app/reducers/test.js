// @flow
import { READ_ACCOUNT, ACCOUNT_CREATED, ACCOUNT_CREATING_FAILED, LOG } from '../actions/test';

const initialState = {
  id: 123, text: 'hello', payload: [], error: ''
};

export default function test(state = initialState, action) {
  switch (action.type) {
    case READ_ACCOUNT:
      return {
        id: 0, text: 'Loading', payload: action.payload, error: action.error
      };
    case ACCOUNT_CREATED:
      return {
        id: 0, text: 'OK', payload: action.payload, error: action.error
      };
    case ACCOUNT_CREATING_FAILED:
      return {
        id: 0, text: action.text, payload: action.payload, error: action.error
      };
    case LOG:
      return {
        id: 0, text: action.text, payload: action.payload, error: action.error
      };
    default:
      return state;
  }
}

