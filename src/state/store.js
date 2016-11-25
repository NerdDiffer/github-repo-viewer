import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const getInitialState = () => ({
  current: { login: 'nerddiffer' }
});

const store = createStore(
  reducers,
  getInitialState(),
  composeEnhancer(
    applyMiddleware(reduxThunk)
  )
);

export default store;
