import {
  LOGIN_STATUS,
  LOGIN_STATUS_SUCCESS,
  LOGIN_STATUS_FAILURE
} from '../actions/fb-login';

const defaultState = {
  loading: false,
  error: null,
  status: null
};

export default (state=defaultState, action) => {
  switch (action.type) {
    case LOGIN_STATUS:
      return {...state, loading: true, error: null, status: null};
    case LOGIN_STATUS_SUCCESS:
      return {...state, loading: false, error: null, status: action.status};
    case LOGIN_STATUS_FAILURE:
      return {...state, loading: false, error: action.error, status: null};
    default:
      return state;
  }
};