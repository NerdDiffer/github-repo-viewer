import {
  REPOS_REPLACE_ALL,
  REPOS_ERROR,
  REPOS_SORT
} from '../constants/actionTypes';

const getFallbackState = key => {
  const defaultState = {
    login: {
      repos: [],
      nextPageUrl: null
    }
  };

  return defaultState[key] || {
    byUser: {},
    secondarySortCriteria: { key: 'name', dir: 'asc' }
  };
};

const reposForUser = (prevState = getFallbackState('login'), action) => {
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
        repos: [...repos],
      }
    }
    default:
      return prevState;
  }
};

const ReposReducer = (prevState = getFallbackState(), action) => {
  switch(action.type) {
    case REPOS_SORT:
    case REPOS_REPLACE_ALL: {
      const { login, secondarySortCriteria } = action;

      return {
        ...prevState,
        secondarySortCriteria: { ...secondarySortCriteria },
        byUser: {
          ...prevState.byUser,
          [login]: reposForUser(prevState[login], action)
        }
      };
    }
    default:
      return prevState;
  }
};

export default ReposReducer;
