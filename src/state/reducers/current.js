import { CURRENT_USER } from '../constants/actionTypes';

const CurrentReducer = (prevState = {}, action) => {
  switch(action.type) {
    case CURRENT_USER:
      return {
        ...prevState,
        login: action.login
      };
    default:
      return prevState;
  }
};

export default CurrentReducer;
