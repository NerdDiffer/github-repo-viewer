import { OWNER_OF_REPO } from '../constants/actionTypes';

const OwnersReducer = (prevState = {}, action) => {
  switch(action.type) {
    case OWNER_OF_REPO: {
      const { login, info } = action;

      return {
        ...prevState,
        [login]: info
      };
    }
    default:
      return prevState;
  }
};

export default OwnersReducer;
