import {LOAD_SDK_START, LOAD_SDK_FINISH} from '../actions/fb-javascript-sdk';

export default function (state=false, action) {
  switch (action.type) {
    case LOAD_SDK_START:
      return false;
    case LOAD_SDK_FINISH:
      return true;
    default:
      return state;
  }
}