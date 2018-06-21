// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import management from '../components/Management';
import * as managementActions from '../actions/management';

function mapStateToProps(state) {
  return {
    employee: state.management.employee,
    welfare: state.management.welfare,
    dbstate: state.management.dbstate,
    dialog: state.management.dialog,
    employeeReload: state.management.employeeReload,
    welfareReload: state.management.welfareReload,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(managementActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(management);
