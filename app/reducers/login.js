// @flow
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/login';

const initialState = {
  isLogin: false, isManagement: false, loginID: '', accInfo: {}, dialog: { alert: { show: false, text: '', title: '' } }
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
    case LOGIN_SUCCESS:
    case LOGIN_FAIL:
      return { ...state, ...action };
    default:
      return state;
  }
}
