import {
  REPOS_START,
  REPOS_REPLACE_ALL,
  REPOS_ERROR,
  REPOS_SORT
} from '../constants/actionTypes';

const getFallbackState = key => {
  const defaultState = {
    login: {
      isFetching: false,
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
    case REPOS_SORT: {
      const { repos } = action;

      return {
        ...prevState,
        repos: [...repos],
      }
    }
    case REPOS_REPLACE_ALL: {
      const { repos, nextPageUrl } = action;

      return {
        ...prevState,
        isFetching: false,
        repos: [...repos],
        nextPageUrl
      }
    }
    case REPOS_START:
      return {
        ...prevState,
        isFetching: true
      }
    default:
      return prevState;
  }
};

const ReposReducer = (prevState = getFallbackState(), action) => {
  switch(action.type) {
    case REPOS_SORT:
    case REPOS_START:
    case REPOS_REPLACE_ALL: {
      const { login, secondarySortCriteria } = action;
      const sortCriteria = secondarySortCriteria || prevState.secondarySortCriteria;
      const prevStateForUser = prevState.byUser[login];

      return {
        ...prevState,
        secondarySortCriteria: sortCriteria,
        byUser: {
          ...prevState.byUser,
          [login]: reposForUser(prevStateForUser, action)
        }
      };
    }
    default:
      return prevState;
  }
};

export default ReposReducer;
