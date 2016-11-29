import test from 'ava';
import * as ActionTypes from '../../../src/state/constants/actionTypes';
import reducer from '../../../src/state/reducers/repos';
import { isObject } from '../../assertions';

test('shape of fallback state', t => {
  const actual = reducer(undefined, {});
  const keys = Object.keys(actual);
  t.deepEqual(keys, ['byUser', 'secondarySortCriteria']);

  t.true(isObject(actual.byUser));

  const expectedSortCriteria = actual.secondarySortCriteria;
  t.true(isObject(expectedSortCriteria));
  t.deepEqual(Object.keys(expectedSortCriteria), ['key', 'dir']);
});

test('replacing all user repos', t => {
  const action = {
    type: ActionTypes.REPOS_REPLACE_ALL,
    login: 'login',
    repos: [{ foo: 'bar' }],
    nextPageUrl: 'link to next page'
  };

  const actual = reducer(undefined, action);
  const expected = {
    secondarySortCriteria: { key: 'name', dir: 'asc' },
    byUser: {
      login: {
        repos: [{ foo: 'bar' }],
        nextPageUrl: 'link to next page'
      }
    }
  };

  t.deepEqual(actual, expected);
});

test('sorting user repos', t => {
  const mockState = {
    secondarySortCriteria: { key: 'name', dir: 'asc' },
    byUser: {
      login: {
        nextPageUrl: 'link to next page',
        repos: [
          { name: 'bravo', updated_at: 0 },
          { name: 'alpha', updated_at: 1 },
        ]
      }
    }
  };

  const action = {
    type: ActionTypes.REPOS_SORT,
    login: 'login',
    repos: [
      { name: 'alpha', updated_at: 1 },
      { name: 'bravo', updated_at: 0 }
    ],
    secondarySortCriteria: { key: 'updated_at', dir: 'desc' }
  };

  const actual = reducer(mockState, action);
  const expected = {
    secondarySortCriteria: { key: 'updated_at', dir: 'desc' },
    byUser: {
      login: {
        repos: [
          { name: 'alpha', updated_at: 1 },
          { name: 'bravo', updated_at: 0 }
        ],
        nextPageUrl: 'link to next page'
      }
    }
  };

  t.deepEqual(actual, expected);
});
