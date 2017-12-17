/* globals FB */

export const LOGIN_STATUS = 'LOGIN_STATUS';
export const LOGIN_STATUS_SUCCESS = 'LOGIN_STATUS_SUCCESS';
export const LOGIN_STATUS_FAILURE = 'LOGIN_STATUS_FAILURE';

function updateStatus() {
  return {
    type: LOGIN_STATUS
  };
}

function updateStatusSuccess(status) {
  return {
    type: LOGIN_STATUS_SUCCESS,
    status: status
  };
}

function updateStatusFailure(error) {
  return {
    type: LOGIN_STATUS_FAILURE,
    error: error
  };
}

const stateChangeCallback = (dispatch) => (
  (res) => {
    if (!res || res.error) {
      dispatch(updateStatusFailure(res.error));
    } else {
      fetch('/auth/facebook/token', {
        method: "POST",
        headers: { 'Authorization': `Bearer ${ res.authResponse.accessToken }` }
      }).then((response) => {
        const token = response.headers.get("x-auth-token");

        if (token) {
          localStorage.setItem("jwt", token);
          dispatch(updateStatusSuccess(res.status));
        }
      });
    }
  }
);

export const getLoginStatus = () => (
  (dispatch) => {
    dispatch(updateStatus());
    FB.getLoginStatus(stateChangeCallback(dispatch));
  }
);

export const login = () => (
  (dispatch) => {
    dispatch(updateStatus());
    FB.login(
      stateChangeCallback(dispatch),
      {scope: 'public_profile,email'}
    );
  }
);