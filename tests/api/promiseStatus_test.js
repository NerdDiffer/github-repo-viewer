import test from 'ava';
import mockFetch from 'fetch-mock';
import { fetchUserRepos, linkHeaders } from './helpers';
import stubbedJson from '../fixtures/repos_1';
import { isObject } from '../assertions';

test.before(t => {
  mockFetch.get(/fulfilled/, {
    body: stubbedJson,
    'status': 200,
    headers: linkHeaders
  });

  mockFetch.get(/rejected/, {
    body: { message: 'Did not find that thing' },
    'status': 404
  });
});

test.after(t => {
  mockFetch.restore();
});

test('properties on a fulfilled promise', t => {
  t.plan(4);

  return fetchUserRepos('fulfilled')
    .then(data => {
      const keys = Object.keys(data);
      t.deepEqual(keys, ['status', 'statusText', 'ok', 'json', 'nextPageUrl']);

      const { json, nextPageUrl } = data;
      t.true(Array.isArray(json));
      t.true(nextPageUrl === null || typeof nextPageUrl === 'string');

      const repo = json[0];
      const importantRepoKeys = ['name', 'description', 'language', 'watchers', 'updated_at', 'html_url'];

      const areImportantKeysPresent = importantRepoKeys.every(key => repo.hasOwnProperty(key));
      t.true(areImportantKeysPresent);
    });
});

test('properties on a rejected promise', t => {
  t.plan(4);

  return fetchUserRepos('rejected')
    .catch(data => {
      const keys = Object.keys(data);
      t.deepEqual(keys, ['status', 'statusText', 'ok', 'json']);

      const { json, status, ok } = data;
      t.false(ok);
      t.true(status >= 400);
      t.true(isObject(json));
    });
});
