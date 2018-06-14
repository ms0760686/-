// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Test from '../components/Test';
import * as TestActions from '../actions/test';

function mapStateToProps(state) {
  return {
    id: state.test.id,
    text: state.test.text,
    payload: state.test.payload,
    error: state.test.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TestActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
