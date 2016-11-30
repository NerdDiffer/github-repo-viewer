import {
  REPOS_ERROR,
  USER_ERROR,
  CURRENT_MSG_CLEAR,
  CURRENT_USER
} from '../constants/actionTypes';
import message from './message';

const CurrentReducer = (prevState = { message: { isVisible: false } }, action) => {
  switch(action.type) {
    case REPOS_ERROR:
    case CURRENT_MSG_CLEAR: {
      return {
        ...prevState,
        message: message(prevState, action)
      }
    }
    case CURRENT_USER:
      return {
        ...prevState,
        login: action.login
      };
    default:
      return prevState;
  }
};

export default CurrentReducer;
