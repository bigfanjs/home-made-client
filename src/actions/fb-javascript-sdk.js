export const LOAD_SDK_START = 'LOAD_SDK_START';
export const LOAD_SDK_FINISH = 'LOAD_SDK_FINISH';

export const loadSdk = () => {
  return {
    type: LOAD_SDK_START
  };
};

export const loadSdkFinish = () => {
  return {
    type: LOAD_SDK_FINISH
  };
};

export const load = () => (
  (dispatch) => {
    dispatch(loadSdk());
    return new Promise((resolve) => {
      window.fbAsyncInit = () => {
        resolve();
        dispatch(loadSdkFinish());
      };

      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    });
  }
);