import {combineReducers} from 'redux';

import user from './user';
import fbLogin from './fb-login';
import SDKLoaded from './sdk-loaded';

export default combineReducers({
  user,
  fbLogin,
  SDKLoaded
});