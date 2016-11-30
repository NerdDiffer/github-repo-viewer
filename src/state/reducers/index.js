import { combineReducers } from 'redux';

import current from './current';
import repos from './repos';
import owners from './owners';

const rootReducer = combineReducers({
  current,
  repos,
  owners
});

export default rootReducer;
