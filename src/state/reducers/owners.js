import {
  USER_START,
  USER_INFO,
  USER_ERROR,
  USER_CACHE_LOGIN
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
        info: { ...info }
      };
    }
    default:
      return prevState;
  }
};

const OwnersReducer = (prevState = { logins: [], byName: {} }, action) => {
  switch(action.type) {
    case USER_ERROR:
    case USER_START:
    case USER_INFO: {
      const { login } = action;

      return {
        ...prevState,
        byName: {
          ...prevState.byName,
          [login]: reduceUserInfo(prevState[login], action)
        }
      };
    }
    case USER_CACHE_LOGIN: {
      const { login } = action;

      return {
        ...prevState,
        logins: prevState.logins.concat(login)
      };
    }
    default:
      return prevState;
  }
};

export default OwnersReducer;
