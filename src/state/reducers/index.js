import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import current from './current';
import repos from './repos';
import owners from './owners';

const rootReducer = combineReducers({
  form,
  current,
  repos,
  owners
});

export default rootReducer;
