/*-----------------------------|| VERIFY USER ||-----------------------------*/
export const VERIFY_USER = 'VERIFY_USER';
export const VERIFY_USER_SUCCESS = 'VERIFY_USER_SUCCESS';
export const VERIFY_USER_FAILURE = 'VERIFY_USER_FAILURE';

function VerifyUserRequest() {
  return {
    type: VERIFY_USER
  };
}

function VerifyUserSuccess() {
  return {
    type: VERIFY_USER_SUCCESS
  };
}

function VerifyUserFailure(error) {
  return {
    type: VERIFY_USER_FAILURE,
    error: error
  };
}

export const VerifyUser = (token) => {
  const config = {
    method: 'get',
    headers: { 'Authorization': token }
  };

  return (dispatch) => {
    dispatch(VerifyUserRequest());
    fetch('/api/users/me', config)
      .then((res) => {
        if (!res.ok) {
          return Promise.reject({});
        }

        return res.json();
      })
      .then(() => {
        dispatch(VerifyUserSuccess());
      })
      .catch((error) => {
        localStorage.removeItem('jwt');
        dispatch(VerifyUserFailure({error}));
      });
  };
};

/*-----------------------------|| LOG OUT USER ||-----------------------------*/
export const SIGNOUT_USER = 'SIGNOUT_USER';

export const signoutUser = () => {
  return {
    type: SIGNOUT_USER,
  };
};