import {
  REPOS_ERROR,
  USER_ERROR,
  MSG_CLEAR
} from '../constants/actionTypes';

const parseMessage = payload => {
  if (typeof payload === 'string') {
    return {
      header: null,
      listItems: null,
      content: payload
    };
  } else {
    const { header, listItems, content } = payload;

    return {
      header,
      listItems,
      content
    };
  }
};

const MessageReducer = (prevState = { isVisible: false }, action) => {
  const { payload } = action;

  switch(action.type) {
    case REPOS_ERROR: {
      return {
        isVisible: true,
        format: 'error',
        ...parseMessage(payload)
      };
    }
    case MSG_CLEAR: {
      return {
        isVisible: false
      }
    }
    default: {
      return prevState;
    }
  }
};

export default MessageReducer;
