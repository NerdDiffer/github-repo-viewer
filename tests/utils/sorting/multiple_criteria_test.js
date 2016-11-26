import test from 'ava';
import { sort } from './helpers';

let input;

test.beforeEach(t => {
  input = [
    { id: 3, watchers: 1, updated_at: '2016-02-12T23:47:29Z', name: 'cherry' },
    { id: 2, watchers: 5, updated_at: '2016-10-12T18:11:35Z', name: 'banana' },
    { id: 1, watchers: 5, updated_at: '2014-09-05T11:11:11Z', name: 'apples' }
  ];
});

test('sorts by watchers (descending), then by name (ascending)', t => {
  const actual = sort(input, { key: 'name', dir: 'asc' });
  const actualIds = actual.map(obj => obj.id);

  t.deepEqual(actualIds, [1, 2, 3]);
});

test('sorts by watchers (descending), then by name (descending)', t => {
  const actual = sort(input, { key: 'name', dir: 'desc' });
  const actualIds = actual.map(obj => obj.id);

  t.deepEqual(actualIds, [2, 1, 3]);
});

test('sorts by watchers (descending), then by updated_at (ascending)', t => {
  const actual = sort(input, { key: 'updated_at', dir: 'asc' });
  const actualIds = actual.map(obj => obj.id);

  t.deepEqual(actualIds, [1, 2, 3]);
});

test('sorts by watchers (descending), then by updated_at (descending)', t => {
  const actual = sort(input, { key: 'updated_at', dir: 'desc' });
  const actualIds = actual.map(obj => obj.id);

  t.deepEqual(actualIds, [2, 1, 3]);
});

test('throws an error when passing invalid value for "key"', t => {
  t.throws(() => sort(input, { dir: 'desc' }), Error);
});

test('throws an error when passing invalid value for "dir"', t => {
  t.throws(() => sort(input, { key: 'updated_at', dir: 'invalid' }), Error);
});
