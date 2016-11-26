import {
  REPOS_REPLACE_ALL,
  REPOS_ERROR,
  REPOS_SORT
} from '../constants/actionTypes';

const getFallbackState = () => ({ repos: [], nextPageUrl: null });

const reposForUser = (prevState = getFallbackState(), action) => {
  switch(action.type) {
    case REPOS_REPLACE_ALL: {
      const { repos, nextPageUrl } = action;

      return {
        ...prevState,
        repos: [...repos],
        nextPageUrl
      }
    }
    case REPOS_SORT: {
      const { repos } = action;

      return {
        ...prevState,
        repos: [...repos]
      }
    }
    default:
      return prevState;
  }
};

const ReposReducer = (prevState = {}, action) => {
  switch(action.type) {
    case REPOS_SORT:
    case REPOS_REPLACE_ALL: {
      const { login } = action;

      return {
        ...prevState,
        [login]: reposForUser(prevState[login], action)
      };
    }
    default:
      return prevState;
  }
};

export default ReposReducer;
