// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as loginActions from '../actions/login';


function mapStateToProps(state) {
  return {
    isLogin: state.login.isLogin,
    loginID: state.login.loginID,
    alert: state.login.dialog.alert
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(loginActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
