// @flow
import ADODB from 'node-adodb';
import type {} from '../reducers/login';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

const connectString = 'Provider=Microsoft.Jet.OLEDB.4.0;Data Source=\\\\NTSERVER\\AECaspWeb\\yunchung_test\\testDB\\test.mdb;';


export function sys(data) {
  if (data.length <= 0) {
    return false;
  }
  return true;
}

export function login(ID: string, Password: string) {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
      isLogin: false,
      dialog: { alert: { show: true, text: 'Loading', title: '' } }
    });
    const connection = ADODB.open(connectString);
    connection
      .query(`SELECT  ID,Name,Postition,Point,Format(WorkingDay, "yyyy/mm/dd") AS WorkingDay FROM Employee WHERE ID='${ID}' AND Pass='${Password}'`)
      .then(data => {
        if (sys(data)) {
          return dispatch({
            type: LOGIN_SUCCESS, isManagement: false, isLogin: true, accInfo: data[0], dialog: { alert: { show: false, text: 'OK', title: '' } }
          });
        }
        return dispatch(managementLogin(ID, Password));
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAIL, isLogin: false, dialog: { show: true, text: '讀取失敗', title: '' }, dbstate: err
        });
      });
  };
}

export function managementLogin(ID: string, Password: string) {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
      isLogin: false,
      dialog: { alert: { show: true, text: 'Loading', title: '' } }
    });
    const connection = ADODB.open(connectString);
    connection
      .query(`SELECT * FROM Management WHERE Account='${ID}' AND Pass='${Password}'`)
      .then(data => {
        if (sys(data)) {
          return dispatch({
            type: LOGIN_SUCCESS, isManagement: true, isLogin: true, accInfo: data[0], dialog: { alert: { show: false, text: 'OK', title: '' } }
          });
        }
        return dispatch({
          type: LOGIN_FAIL, isManagement: false, isLogin: false, dialog: { alert: { show: true, text: '帳密錯誤', title: '' } }
        });
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAIL, isLogin: false, dialog: { show: true, text: '讀取失敗', title: '' }, dbstate: err
        });
      });
  };
}

