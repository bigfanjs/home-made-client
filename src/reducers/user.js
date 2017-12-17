import {
    VERIFY_USER,
    VERIFY_USER_SUCCESS,
    VERIFY_USER_FAILURE,
  
    SIGNOUT_USER
  } from '../actions/user';
  
  const defaultState = {
    status: null,
    loading: false,
    error: null
  };
  
  export default function (state=defaultState, action) {
    switch (action.type) {
  
      // Verify User
      case VERIFY_USER:
        return {...state, status: 'verify', loading: true, error: null};
      case VERIFY_USER_SUCCESS:
        return {...state, status: 'authenticated', loading: false, error: null};
      case VERIFY_USER_FAILURE:
        return {...state, status: 'verify', loading: false, error: action.error};
  
      // Logout User
      case SIGNOUT_USER:
        return {...state, status: 'signout', loading: false, error: null};
  
      default:
        return state;
    }
  }