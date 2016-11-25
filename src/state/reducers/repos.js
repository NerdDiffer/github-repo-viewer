import { REPOS_REPLACE_ALL, REPOS_ERROR } from '../constants/actionTypes';

const ReposReducer = (prevState = {}, action) => {
  switch(action.type) {
    case REPOS_REPLACE_ALL: {
      const { login, repos } = action;

      return {
        ...prevState,
        [login]: [...repos]
      }
    }
    default:
      return prevState;
  }
};

export default ReposReducer;
