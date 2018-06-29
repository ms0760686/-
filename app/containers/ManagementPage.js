// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import management from '../components/Management';
import * as dbActions from '../actions/db';
import * as dialogActions from '../actions/dialog';

function mapStateToProps(state) {
  return {
    employee: state.management.employee,
    welfare: state.management.welfare,
    welfareRecord: state.management.welfareRecord,
    exportWelfare: state.management.exportWelfare,
    dbstate: state.management.dbstate,
    dialog: state.management.dialog,
    employeeReload: state.management.employeeReload,
    welfareReload: state.management.welfareReload,
    welfareRecordReload: state.management.welfareRecordReload,
    accInfo: state.login.accInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(dbActions, dialogActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(management);
