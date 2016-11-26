import {
  REPOS_REPLACE_ALL,
  REPOS_ERROR,
  OWNER_OF_REPO,
  CURRENT_USER,
  REPOS_SORT
} from '../constants/actionTypes';
import { fetchUserRepos } from '../../api';
import sort from '../../utils/sorting';

// package relevant information about a single repo
const collectRepoInfo = repo => {
  const  { id, name, description, language, watchers_count, watchers, size, created_at, updated_at, pushed_at, html_url } = repo;
  return { id, name, description, language, watchers_count, watchers, size, created_at, updated_at, pushed_at, html_url };
};

// package relevant information about owner of a repo
const collectOwnerInfo = owner => {
  const  { login, id, avatar_url, gravatar_url, html_url, type } = owner;
  return { login, id, avatar_url, gravatar_url, html_url, type };
};

export const getRepos = login => {
  return (dispatch, getState) => (
    fetchUserRepos(login)
      .then(res => {
        console.log(res);
        const { repos, nextPageUrl } = res;

        dispatch({ type: CURRENT_USER, login });
        dispatch({
          type: OWNER_OF_REPO,
          login,
          info: collectOwnerInfo(repos[0].owner)
        });

        return { repos, nextPageUrl };
      })
      .then(({ repos, nextPageUrl }) => {
        dispatch({
          type: REPOS_REPLACE_ALL,
          login,
          repos: repos.map(collectRepoInfo),
          nextPageUrl
        });

        return repos;
      })
      .then(repos => {
        const sortedRepos = sort(repos);
        dispatch({ type: REPOS_SORT, repos: sortedRepos, login });
      })
      .catch(err => {
        //const message = err.toString();
        //dispatch({ type: REPOS_ERROR, message })
      })
  );
};
