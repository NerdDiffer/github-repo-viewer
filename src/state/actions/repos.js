import {
  REPOS_REPLACE_ALL,
  REPOS_ERROR,
  CURRENT_USER,
  REPOS_SORT
} from '../constants/actionTypes';
import { clearMessage } from './message';
import { fetchUserRepos } from '../../api';
import sort from '../../utils/sorting';

// package relevant information about a single repo
const collectRepoInfo = repo => {
  const  { id, name, description, language, watchers_count, watchers, size, created_at, updated_at, pushed_at, html_url } = repo;
  return { id, name, description, language, watchers_count, watchers, size, created_at, updated_at, pushed_at, html_url };
};

export const sortRepos = (login, repos, secondarySortCriteria) => {
  return (dispatch, getState) => {
    const sortedRepos = sort(repos, secondarySortCriteria);

    dispatch({
      type: REPOS_SORT,
      login,
      repos: sortedRepos,
      secondarySortCriteria
    });
  }
};

export const getRepos = login => {
  return (dispatch, getState) => {
    const currState = getState().repos.byUser[login];

    if (currState && !!currState.repos) {
      return null;
    }

    return fetchUserRepos(login)
      .then(res => {
        const { status } = res;

        if (status >= 400) {
          throw Error(res);
        }

        const { json, nextPageUrl } = res;

        dispatch({ type: CURRENT_USER, login });

        const mappedRepos = json.map(collectRepoInfo);

        dispatch({
          type: REPOS_REPLACE_ALL,
          login,
          repos: mappedRepos,
          nextPageUrl
        });

        return mappedRepos
      })
      .then(repos => {
        dispatch(sortRepos(login, repos, { key: 'updated_at', dir: 'desc' }));
      })
      .then(() => dispatch(clearMessage()))
      .catch(err => {
        console.log(err);
        const { message } = err.json;
        dispatch({ type: REPOS_ERROR, payload: message })
      })
  };
};
