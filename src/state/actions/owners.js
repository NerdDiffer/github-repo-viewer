import {
  USER_START,
  USER_INFO,
  USER_ERROR
} from '../constants/actionTypes';
import { fetchUser } from '../../api';

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
        console.log(res);
        const { user } = res;

        dispatch({
          type: USER_INFO,
          login,
          info: collectOwnerInfo(user)
        });
      })
  };
};
