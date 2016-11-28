import { combineReducers } from 'redux';

import current from './current';
import repos from './repos';
import owners from './owners';
import message from './message';

const rootReducer = combineReducers({
  current,
  repos,
  owners,
  message
});

export default rootReducer;
