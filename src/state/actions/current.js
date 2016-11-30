import {
  CURRENT_MSG_CLEAR,
  CURRENT_USER
} from '../constants/actionTypes';

export const clearMessage = () => ({
  type: CURRENT_MSG_CLEAR
})

export const setCurrentUser = login => (
  { type: CURRENT_USER, login }
);
