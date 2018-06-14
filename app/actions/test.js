// @flow
import ADODB from 'node-adodb';
import thunk from 'redux-thunk';
import type {} from '../reducers/test';


export const READ_ACCOUNT = 'READ_ACCOUNT';
export const ACCOUNT_CREATED = 'ACCOUNT_CREATED';
export const ACCOUNT_CREATING_FAILED = 'ACCOUNT_CREATING_FAILED';
export const LOG = 'LOG';

export function readAccount() {
  return { type: 'READ_ACCOUNT', payload: [] };
}
export function accountCreated(account) {
  return { type: 'ACCOUNT_CREATED', payload: account };
}
export function accountCreatingFailed(err) {
  return { type: 'ACCOUNT_CREATING_FAILED', payload: [], error: err.process.message };
}
export function test(err) {
  return { type: 'LOG', payload: [], text: err };
}

export function increment() {
  return (dispatch) => {
    dispatch(readAccount());
    const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=\\\\NTSERVER\\AECaspWeb\\yunchung_test\\test.mdb;');
    dispatch(test(connection.connection));
    connection
      .query('SELECT * FROM Employee')
      .then(data =>
        dispatch(accountCreated(data)))
      .catch(error => {
        dispatch(accountCreatingFailed(error));
      });
  };
}

export function increment2() {
  return (dispatch) => {
    dispatch(readAccount());
    const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=\\\\NTSERVER\\AECaspWeb\\yunchung_test\\test.mdb;');
    dispatch(test(connection.connection));
    connection
      .query('SELECT * FROM Employee')
      .then(data =>
        dispatch(accountCreated(data)))
      .catch(error => {
        dispatch(accountCreatingFailed(error));
      });
  };
}

export function incrementAsync(delay: number = 1000) {
  return (dispatch: (action: actionType) => void) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}
