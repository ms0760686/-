// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import member from '../components/Member';
import * as dbActions from '../actions/db';
import * as dialogActions from '../actions/dialog';

function mapStateToProps(state) {
  return {
    employee: state.member.employee,
    welfare: state.member.welfare,
    dbstate: state.member.dbstate,
    dialog: state.member.dialog,
    employeeReload: state.member.employeeReload,
    welfareReload: state.member.welfareReload,
    welfareRecordReload: state.member.welfareRecordReload,
    accInfo: state.login.accInfo,
    welfareRecord: state.member.welfareRecord,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(dbActions, dialogActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(member);
