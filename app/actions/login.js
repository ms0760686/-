// @flow
import ADODB from 'node-adodb';
import type {} from '../reducers/login';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

const connectString = 'Provider=Microsoft.Jet.OLEDB.4.0;Data Source=\\\\NTSERVER\\AECaspWeb\\yunchung_test\\test.mdb;';


export function sys(data) {
  if (data.length <= 0) {
    return { type: LOGIN_FAIL, isLogin: false, dialog: { alert: { show: true, text: '帳密錯誤', title: '' } } };
  }
  return {
    type: LOGIN_SUCCESS, isLogin: true, employee: data, dialog: { alert: { show: true, text: 'OK', title: '' } }
  };
}

export function login(ID: string, Password: string) {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
      isLogin: false,
      employee: [],
      dialog: { alert: { show: true, text: 'Loading', title: '' } }
    });
    const connection = ADODB.open(connectString);
    connection
      .query(`SELECT  ID,Name,Postition,Point,Format(WorkingDay, "yyyy/mm/dd") AS WorkingDay FROM Employee WHERE ID='${ID}' AND Pass='${Password}'`)
      .then(data =>
        dispatch(sys(data)))
      .catch(err => {
        dispatch({
          type: LOGIN_FAIL, isLogin: false, dialog: { show: true, text: '讀取失敗', title: '' }, dbstate: err
        });
      });
  };
}

