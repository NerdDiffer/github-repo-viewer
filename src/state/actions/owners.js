import {
  USER_START,
  USER_INFO,
  USER_ERROR,
  USER_CACHE_LOGIN
} from '../constants/actionTypes';
import { fetchUser } from '../../api';
import { clearMessage, setCurrentUser } from './current';

const userError = (login, message) => {
  return {
    type: USER_ERROR,
    login,
    payload: message
  }
};

// package relevant information about a user
const collectOwnerInfo = user => {
  const  { login, id, avatar_url, gravatar_url, html_url, type, name, location, email, hireable, public_repos, followers, following, created_at } = user;
  return { login, id, avatar_url, gravatar_url, html_url, type, name, location, email, hireable, public_repos, followers, following, created_at };
};

export const showUser = login => {
  const thunk = (dispatch, getState) => {
    if (getState().current.message.isVisible) {
      dispatch(clearMessage());
    }
    dispatch(setCurrentUser(login));
  };

  return thunk;
};

export const cacheUser = login => {
  return (dispatch, getState) => {
    const user = getState().owners[login];

    if (!user) {
      dispatch({ type: USER_CACHE_LOGIN, login });
    }
  };
};

export const getUser = login => {
  return (dispatch, getState) => {
    const user = getState().owners.byName[login];

    if (!!user) {
      if (user.isValid) {
        dispatch(showUser(login));
        return Promise.resolve();
      } else {
        const msg = 'Invalid user';
        dispatch(userError(login, msg));
        dispatch(setCurrentUser(null));
        return;
      }
    }

    dispatch({ type: USER_START, login });

    return fetchUser(login)
      .then(res => {
        const { status } = res;

        if (status >= 400) {
          throw Error(res);
        }

        const { json } = res;

        dispatch({
          type: USER_INFO,
          login,
          info: collectOwnerInfo(json)
        });
      })
      .then(() => {
        if (getState().current.message.isVisible) {
          dispatch(clearMessage());
        }
      })
      .then(() => dispatch(cacheUser(login)))
      .catch(err => {
        console.log(err);
        const { message } = err.json;
        dispatch(userError(login, message));
      })
  };
};
