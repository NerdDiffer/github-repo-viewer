import test from 'ava';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import mockFetch from 'fetch-mock';

import * as ActionTypes from '../../../../src/state/constants/actionTypes';
import { fetchUserRepos } from '../../../../src/api';
import { getRepos } from '../../../../src/state/actions/repos';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

test.afterEach(t => {
  mockFetch.restore();
});

test('Handling a 404 response', t => {
  // Set up mock fetch response
  const response = {
    body: {
      message: "Not Found",
      documentation_url: "https://developer.github.com/v3"
    },
    'status': 404
  };

  mockFetch.get('*', response);

  // Set up mock store & app state
  const mockState = {
    repos: { byUser: {} }
  };
  const store = mockStore(mockState);

  t.plan(1);

  return store.dispatch(getRepos('a login you cannot find'))
    .then(() => {
      const actual = store.getActions();
      const expected = [
        { type: ActionTypes.REPOS_ERROR, message: 'Not Found' }
      ];

      t.deepEqual(actual, expected);
    });
});
