// @flow
import {
  READ_EMPLOYEE_DATABASE,
  READ_EMPLOYEE,
  READ_EMPLOYEE_FAILED,
  READ_WELFARE_DATABASE,
  READ_WELFARE,
  READ_WELFARE_FAILED,
  DIALOG,
  RELOAD_EMPLOYEE,
  RELOAD_WELFARE,
  RELOAD_WELFARE_RECORD,
  READ_WELFARE_RECORD_DATABASE,
  READ_WELFARE_RECORD,
  READ_WELFARE_RECORD_FAILED,
} from '../actions/db';

const initialState = {
  welfare: [], employee: [], dbstate: '', dialog: { show: false, text: '' }, welfareRecordReload: false, employeeReload: false, welfareReload: false, welfareRecord: []
};

export default function management(state = initialState, action) {
  switch (action.type) {
    case DIALOG:
      return {
        ...state, dialog: action.dialog, dbstate: action.dbstate
      };
    case READ_EMPLOYEE_DATABASE:
      return {
        ...state, employee: action.employee, dialog: action.dialog, employeeReload: false
      };
    case READ_EMPLOYEE:
      return {
        ...state, employee: action.employee, dialog: action.dialog
      };
    case READ_EMPLOYEE_FAILED:
      return {
        ...state, dbstate: action.dbstate, dialog: action.dialog
      };
    case READ_WELFARE_DATABASE:
      return {
        ...state, welfare: action.welfare, dialog: action.dialog, welfareReload: false
      };
    case READ_WELFARE:
      return {
        ...state, welfare: action.welfare, dialog: action.dialog
      };
    case READ_WELFARE_FAILED:
      return {
        ...state, dbstate: action.dbstate, dialog: action.dialog
      };
    case READ_WELFARE_RECORD_DATABASE:
      return {
        ...state,
        welfareRecord: action.welfareRecord,
        dialog: action.dialog,
        welfareRecordReload: false
      };
    case READ_WELFARE_RECORD:
      return {
        ...state, welfareRecord: action.welfareRecord, dialog: action.dialog
      };
    case READ_WELFARE_RECORD_FAILED:
      return {
        ...state, dbstate: action.dbstate, dialog: action.dialog
      };
    case RELOAD_EMPLOYEE:
      return {
        ...state,
        dialog: action.dialog,
        employeeReload: true
      };
    case RELOAD_WELFARE:
      return {
        ...state,
        dialog: action.dialog,
        welfareReload: true
      };
    case RELOAD_WELFARE_RECORD:
      return {
        ...state,
        dialog: action.dialog,
        welfareRecordReload: true
      };
    default:
      return state;
  }
}
