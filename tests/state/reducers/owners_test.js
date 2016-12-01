import test from 'ava';
import * as ActionTypes from '../../../src/state/constants/actionTypes';
import reducer from '../../../src/state/reducers/owners';

test('USER_START', t => {
  const action = {
    type: ActionTypes.USER_START,
    login: 'KingCrimson',
    info: { bio: 'matte kudasai' }
  };

  const actual = reducer(undefined, action);
  const expected = {
    logins: [],
    byName: {
      KingCrimson: { isFetching: true }
    }
  };

  t.deepEqual(actual, expected);
});

test('USER_INFO', t => {
  const action = {
    type: ActionTypes.USER_INFO,
    login: 'KingCrimson',
    info: { bio: 'matte kudasai' }
  };

  const actual = reducer(undefined, action);
  const expected = {
    logins: [],
    byName: {
      KingCrimson: {
        isValid: true,
        isFetching: false,
        info: { bio: 'matte kudasai' }
      }
    }
  };

  t.deepEqual(actual, expected);
});

test('USER_CACHE_LOGIN', t => {
  const action = {
    type: ActionTypes.USER_CACHE_LOGIN,
    login: 'bar'
  };

  const actual = reducer({ logins: ['foo'] }, action);
  const expected = { logins: ['foo', 'bar'] };

  t.deepEqual(actual, expected);
});
