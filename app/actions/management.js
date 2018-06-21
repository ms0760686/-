// @flow
import ADODB from 'node-adodb';
import type {} from '../reducers/management';


export const READ_EMPLOYEE_DATABASE = 'READ_EMPLOYEE_DATABASE';
export const READ_EMPLOYEE = 'READ_EMPLOYEE';
export const READ_EMPLOYEE_FAILED = 'READ_EMPLOYEE_FAILED';
export const READ_WELFARE_DATABASE = 'READ_WELFARE_DATABASE';
export const READ_WELFARE = 'READ_WELFARE';
export const READ_WELFARE_FAILED = 'READ_WELFARE_FAILED';
export const DIALOG = 'DIALOG';
export const RELOAD_EMPLOYEE = 'RELOAD_EMPLOYEE';
export const RELOAD_WELFARE = 'RELOAD_WELFARE';

const connectString = 'Provider=Microsoft.Jet.OLEDB.4.0;Data Source=\\\\NTSERVER\\AECaspWeb\\yunchung_test\\test.mdb;';
export function readEmployee() {
  return (dispatch) => {
    dispatch({ type: READ_EMPLOYEE_DATABASE, employee: [], dialog: { show: true, text: 'Loading' } });
    const connection = ADODB.open(connectString);
    connection
      .query('SELECT  ID,Name,Postition,Format(WorkingDay, "yyyy/mm/dd") AS WorkingDay FROM Employee')
      .then(data =>
        dispatch({ type: READ_EMPLOYEE, employee: data, dialog: { show: false, text: 'OK' } }))
      .catch(err => {
        dispatch({
          type: READ_EMPLOYEE_FAILED, dialog: { show: true, text: '讀取失敗' }, dbstate: err
        });
      });
  };
}

export const createEmployee = (data: object) => (
  (dispatch) => {
    let item = '';
    let value = '';
    Object.keys(data).forEach((obj) => {
      item += `${obj},`;
      value += `'${data[obj]}',`;
    });
    item = item.substring(0, item.length - 1);
    value = value.substring(0, value.length - 1);
    const sqlStr = `INSERT INTO Employee (${item}) VALUES ( ${value})`;
    dispatch({ type: DIALOG, dialog: { show: true, text: '新增中' } });
    const connection = ADODB.open(connectString);
    connection
      .execute(sqlStr)
      .then(() =>
        dispatch({ type: RELOAD_EMPLOYEE, dialog: { show: false, text: 'OK' } }))
      .catch(error =>
        dispatch({ type: DIALOG, dialog: { show: true, text: 'Error' }, dbstate: error }));
  }
);

export const editEmployee = (data: object, id: string) => (
  (dispatch) => {
    const sqlStr = `UPDATE Employee SET ${data.item} = '${data.value}' WHERE ID = '${id}'`;
    dispatch({ type: DIALOG, dialog: { show: true, text: '更新中' } });
    const connection = ADODB.open(connectString);
    connection
      .execute(sqlStr)
      .then(() =>
        dispatch({ type: RELOAD_EMPLOYEE, dialog: { show: false, text: 'OK' } }))
      .catch(error =>
        dispatch({ type: DIALOG, dialog: { show: true, text: 'Error' }, dbstate: error }));
  }
);

export const deleteEmployee = (data: Array) => (
  (dispatch) => {
    let value = '';
    data.forEach((obj) => {
      value += `ID = '${obj}' OR `;
    });
    value = value.substring(0, value.length - 4);
    const sqlStr = `DELETE FROM Employee WHERE ${value}`;
    dispatch({ type: DIALOG, dialog: { show: true, text: '刪除中' } });
    const connection = ADODB.open(connectString);
    connection
      .execute(sqlStr)
      .then(() =>
        dispatch({ type: RELOAD_EMPLOYEE, dialog: { show: false, text: 'OK' } }))
      .catch(error =>
        dispatch({ type: DIALOG, dialog: { show: true, text: 'Error' }, dbstate: error }));
  }
);

export function readWelfare() {
  return (dispatch) => {
    dispatch({ type: READ_WELFARE_DATABASE, welfare: [], dialog: { show: true, text: 'Loading' } });
    const connection = ADODB.open(connectString);
    connection
      .query('SELECT Name,Point,Description,Format(StartDate, "yyyy/mm/dd") AS StartDate,Format(EndDate, "yyyy/mm/dd") AS EndDate FROM CorporateWelfare')
      .then(data =>
        dispatch({ type: READ_WELFARE, welfare: data, dialog: { show: false, text: 'OK' } }))
      .catch(err => {
        dispatch({
          type: READ_WELFARE_FAILED, dialog: { show: true, text: '讀取失敗' }, dbstate: err
        });
      });
  };
}

export const createWelfare = (data: object) => (
  (dispatch) => {
    let item = '';
    let value = '';
    Object.keys(data).forEach((obj) => {
      item += `${obj},`;
      value += `'${data[obj]}',`;
    });
    item = item.substring(0, item.length - 1);
    value = value.substring(0, value.length - 1);
    const sqlStr = `INSERT INTO CorporateWelfare (${item}) VALUES ( ${value})`;
    dispatch({ type: DIALOG, dialog: { show: true, text: '新增中' } });
    const connection = ADODB.open(connectString);
    connection
      .execute(sqlStr)
      .then(() =>
        dispatch({ type: RELOAD_WELFARE, dialog: { show: false, text: 'OK' } }))
      .catch(error =>
        dispatch({ type: DIALOG, dialog: { show: true, text: 'Error' }, dbstate: error }));
  }
);


export const deleteWelfare = (data: Array) => (
  (dispatch) => {
    let value = '';
    data.forEach((obj) => {
      value += `Name = '${obj}' OR `;
    });
    value = value.substring(0, value.length - 4);
    const sqlStr = `DELETE FROM CorporateWelfare WHERE ${value}`;
    dispatch({ type: DIALOG, dialog: { show: true, text: '刪除中' } });
    const connection = ADODB.open(connectString);
    connection
      .execute(sqlStr)
      .then(() =>
        dispatch({ type: RELOAD_WELFARE, dialog: { show: false, text: 'OK' } }))
      .catch(error =>
        dispatch({ type: DIALOG, dialog: { show: true, text: 'Error' }, dbstate: error }));
  }
);

export const editWelfare = (data: object, id: string) => (
  (dispatch) => {
    const sqlStr = `UPDATE CorporateWelfare SET ${data.item} = '${data.value}' WHERE Name = '${id}'`;
    dispatch({ type: DIALOG, dialog: { show: true, text: '更新中' } });
    const connection = ADODB.open(connectString);
    connection
      .execute(sqlStr)
      .then(() =>
        dispatch({ type: RELOAD_WELFARE, dialog: { show: false, text: 'OK' } }))
      .catch(error =>
        dispatch({ type: DIALOG, dialog: { show: true, text: 'Error' }, dbstate: error }));
  }
);
