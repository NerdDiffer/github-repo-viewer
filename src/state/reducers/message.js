import {
  REPOS_ERROR,
  USER_ERROR
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

const MessageReducer = (prevState = {}, action) => {
  const { payload } = action;

  switch(action.type) {
    case REPOS_ERROR: {
      return {
        format: 'error',
        message: { ...parseMessage(payload) }
      };
    }
    default: {
      return prevState;
    }
  }
};

export default MessageReducer;
