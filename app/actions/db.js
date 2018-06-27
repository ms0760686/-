// @flow
import ADODB from 'node-adodb';
import uuidv4 from 'uuid/v4';
import moment from 'moment';

export const READ_EMPLOYEE_DATABASE = 'READ_EMPLOYEE_DATABASE';
export const READ_EMPLOYEE = 'READ_EMPLOYEE';
export const READ_EMPLOYEE_FAILED = 'READ_EMPLOYEE_FAILED';
export const READ_WELFARE_DATABASE = 'READ_WELFARE_DATABASE';
export const READ_WELFARE = 'READ_WELFARE';
export const READ_WELFARE_FAILED = 'READ_WELFARE_FAILED';
export const DIALOG = 'DIALOG';
export const RELOAD_EMPLOYEE = 'RELOAD_EMPLOYEE';
export const RELOAD_WELFARE = 'RELOAD_WELFARE';
export const READ_WELFARE_RECORD_DATABASE = 'READ_WELFARE_RECORD_DATABASE';
export const READ_WELFARE_RECORD = 'READ_WELFARE_RECORD';
export const READ_WELFARE_RECORD_FAILED = 'READ_WELFARE_RECORD_FAILED';
export const RELOAD_WELFARE_RECORD = 'RELOAD_WELFARE_RECORD';

export function memberSys(data) {
  if (data.length === 1) {
    return true;
  }
  return false;
}
const connectString = 'Provider=Microsoft.Jet.OLEDB.4.0;Data Source=\\\\NTSERVER\\AECaspWeb\\yunchung_test\\test.mdb;';
export function readEmployee(ID) {
  return (dispatch) => {
    dispatch({ type: READ_EMPLOYEE_DATABASE, employee: [], dialog: { show: true, text: 'Loading' } });
    const connection = ADODB.open(connectString);
    let sqlStr = '';
    if (ID === undefined) {
      sqlStr = 'SELECT  ID,Name,Postition,Point,Format(WorkingDay, "yyyy/mm/dd") AS WorkingDay FROM Employee';
    } else {
      sqlStr = `SELECT  ID,Name,Postition,Point,Format(WorkingDay, "yyyy/mm/dd") AS WorkingDay FROM Employee WHERE ID='${ID}'`;
    }
    connection
      .query(sqlStr)
      .then(data => {
        if (ID !== undefined) {
          if (memberSys(data)) {
            return dispatch({ type: READ_EMPLOYEE, employee: data, dialog: { show: false, text: 'OK' } });
          }
          return dispatch({
            type: READ_EMPLOYEE_FAILED, dialog: { show: true, text: '系統錯誤 (重複ID)' }
          });
        }
        return dispatch({ type: READ_EMPLOYEE, employee: data, dialog: { show: false, text: 'OK' } });
      })
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

export function readWelfareRecord(ID) {
  return (dispatch) => {
    dispatch({ type: READ_WELFARE_RECORD_DATABASE, welfareRecord: [], dialog: { show: true, text: 'Loading' } });
    let sqlStr = '';
    if (ID === undefined) {
      sqlStr = 'SELECT GuidCode,Name,ID,Disabled,ID_Name,Num,Point,TotalPoints,Description,Format(CreateDate, "yyyy/mm/dd") AS CreateDate FROM WelfareRecord';
    } else {
      sqlStr = `SELECT GuidCode,Name,ID,Disabled,ID_Name,Num,Point,TotalPoints,Description,Format(CreateDate, "yyyy/mm/dd") AS CreateDate FROM WelfareRecord WHERE ID='${ID}'`;
    }
    const connection = ADODB.open(connectString);
    connection
      .query(sqlStr)
      .then(data =>
        dispatch({ type: READ_WELFARE_RECORD, welfareRecord: data, dialog: { show: false, text: 'OK' } }))
      .catch(err => {
        dispatch({
          type: READ_WELFARE_RECORD_FAILED, dialog: { show: true, text: '讀取失敗' }, dbstate: err
        });
      });
  };
}
export function deleteWelfareRecord() {
  return (dispatch) => {

  };
}
export function editWelfareRecord() {
  return (dispatch) => {

  };
}
export const crateWelfareRecord = (data, accInfo, description) => (
  (dispatch) => {
    const item = 'Name,Point,TotalPoints,Num,GuidCode,CreateDate,ID,ID_Name,Description,Disabled';
    const value = `'${data.Name}','${data.Point}','${data.Point * data.Num}','${data.Num}','${uuidv4()}','${moment().format('YYYY/MM/DD')}','${accInfo.ID}','${accInfo.Name}','${description}',false`;
    const sqlStr = `INSERT INTO WelfareRecord (${item}) VALUES ( ${value})`;
    dispatch({ type: DIALOG, dialog: { show: true, text: '新增中' } });
    const connection = ADODB.open(connectString);
    connection
      .execute(sqlStr)
      .then(() =>
        dispatch({ type: RELOAD_WELFARE_RECORD, dialog: { show: false, text: 'OK' } }))
      .catch(error =>
        dispatch({ type: DIALOG, dialog: { show: true, text: 'Error' }, dbstate: error }));
  }
);

export function reserveWelfare(data, accInfo, description) {
  return (dispatch) => {
    dispatch({ type: READ_EMPLOYEE_DATABASE, employee: [], dialog: { show: true, text: 'Loading' } });
    const connection = ADODB.open(connectString);
    const sqlStr = `SELECT  Point FROM Employee WHERE ID='${accInfo.ID}'`;
    connection
      .query(sqlStr)
      .then(reqdata => {
        if (memberSys(reqdata)) {
          return dispatch(reserveEditEmployee(
            { item: 'Point', value: reqdata[0].Point - (data.Point * data.Num) },
            accInfo,
            data,
            description
          ));
        }
        return dispatch({
          type: READ_EMPLOYEE_FAILED, dialog: { show: true, text: '系統錯誤 (重複ID)' }
        });
      })
      .catch(err => {
        dispatch({
          type: READ_EMPLOYEE_FAILED, dialog: { show: true, text: '讀取失敗' }, dbstate: err
        });
      });
  };
}
export const reserveEditEmployee = (Employeedata: object, accInfo: object, data, description) => (
  (dispatch) => {
    const sqlStr = `UPDATE Employee SET ${Employeedata.item} = '${Employeedata.value}' WHERE ID = '${accInfo.ID}'`;
    dispatch({ type: DIALOG, dialog: { show: true, text: '更新中' } });
    const connection = ADODB.open(connectString);
    connection
      .execute(sqlStr)
      .then(() =>
        dispatch(crateWelfareRecord(data, accInfo, description)))
      .catch(error =>
        dispatch({ type: DIALOG, dialog: { show: true, text: 'Error' }, dbstate: error }));
  }
);
