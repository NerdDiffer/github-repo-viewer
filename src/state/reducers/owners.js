import {
  USER_START,
  USER_INFO,
  USER_ERROR
} from '../constants/actionTypes';

const reduceUserInfo = (prevState = {}, action) => {
  switch(action.type) {
    case USER_START: {
      return {
        ...prevState,
        isFetching: true
      };
    }
    case USER_ERROR: {
      return {
        isValid: false,
        isFetching: false
      };
    }
    case USER_INFO: {
      const { info } = action;

      return {
        isValid: true,
        isFetching: false,
        ...info
      };
    }
    default:
      return prevState;
  }
};

const OwnersReducer = (prevState = {}, action) => {
  switch(action.type) {
    case USER_ERROR:
    case USER_START:
    case USER_INFO: {
      const { login } = action;

      return {
        ...prevState,
        [login]: reduceUserInfo(prevState[login], action)
      };
    }
    default:
      return prevState;
  }
};

export default OwnersReducer;
