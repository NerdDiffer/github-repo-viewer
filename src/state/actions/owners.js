import {
  USER_START,
  USER_INFO,
  USER_ERROR
} from '../constants/actionTypes';
import { fetchUser } from '../../api';
import { clearMessage } from './message';

// package relevant information about a user
const collectOwnerInfo = user => {
  const  { login, id, avatar_url, gravatar_url, html_url, type, name, location, email, hireable, public_repos, followers, following, created_at } = user;
  return { login, id, avatar_url, gravatar_url, html_url, type, name, location, email, hireable, public_repos, followers, following, created_at };
};

export const getUser = login => {
  return (dispatch, getState) => {
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
      .then(() => dispatch(clearMessage()))
      .catch(err => {
        const { message } = err.json;
        dispatch({ type: USER_ERROR, message, login });
      })
  };
};
