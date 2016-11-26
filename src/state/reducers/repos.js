import {
  REPOS_REPLACE_ALL,
  REPOS_ERROR,
} from '../constants/actionTypes';

const reposForUser = (prevState = {}, action) => {
  switch(action.type) {
    case REPOS_REPLACE_ALL: {
      const { repos, nextPageUrl } = action;

      return {
        ...prevState,
        repos: [...repos],
        nextPageUrl
      }
    }
    default:
      return prevState;
  }
};

const ReposReducer = (prevState = {}, action) => {
  switch(action.type) {
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
