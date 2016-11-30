import test from 'ava';
import sort from '../../../src/utils/sorting';

let input;

test.beforeEach(t => {
  input = [
    { id: 3, watchers: 1, updated_at: '2016-02-12T23:47:29Z', name: 'cherry' },
    { id: 2, watchers: 5, updated_at: '2016-10-12T18:11:35Z', name: 'banana' },
    { id: 1, watchers: 9, updated_at: '2014-09-05T11:11:11Z', name: 'apples' }
  ];
});

test('sorts by watchers (descending)', t => {
  const key = 'watchers';
  const sortCriteria = { key, dir: 'desc' };
  const actual = sort(input, sortCriteria);
  const mappedValues = actual.map(obj => obj[key]);

  t.deepEqual(mappedValues, [9, 5, 1]);
});

test('When two items are considered equal, secondarily sorts by updated_at (descending)', t => {
  const key = 'watchers';
  const sortCriteria = { key, dir: 'desc' };

  const input = [
    { id: 3, watchers: 1, updated_at: '2016-11-30T20:31:40Z' },
    { id: 2, watchers: 5, updated_at: '2016-11-30T20:31:10Z' },
    { id: 1, watchers: 5, updated_at: '2016-11-30T20:31:20Z' },
  ];

  const actual = sort(input, sortCriteria);

  const expected = [
    { id: 1, watchers: 5, updated_at: '2016-11-30T20:31:20Z' },
    { id: 2, watchers: 5, updated_at: '2016-11-30T20:31:10Z' },
    { id: 3, watchers: 1, updated_at: '2016-11-30T20:31:40Z' },
  ];

  t.deepEqual(actual, expected);
});

test('sort by name (descending)', t => {
  const key = 'name';
  const actual = sort(input, { key, dir: 'desc' });
  const mappedValues = actual.map(obj => obj[key]);

  t.deepEqual(mappedValues, ['cherry', 'banana', 'apples']);
});

test('sorts by updated_at (ascending)', t => {
  const key = 'updated_at';
  const actual = sort(input, { key, dir: 'asc' });
  const mappedValues = actual.map(obj => obj[key]);
  const expectedMappedValues = [
    '2014-09-05T11:11:11Z',
    '2016-02-12T23:47:29Z',
    '2016-10-12T18:11:35Z',
  ];

  t.deepEqual(mappedValues, expectedMappedValues);
});

test('sorts by updated_at (descending)', t => {
  const key = 'updated_at';
  const actual = sort(input, { key, dir: 'desc' });
  const mappedValues = actual.map(obj => obj[key]);
  const expectedMappedValues = [
    '2016-10-12T18:11:35Z',
    '2016-02-12T23:47:29Z',
    '2014-09-05T11:11:11Z',
  ];

  t.deepEqual(mappedValues, expectedMappedValues);
});

test('throws an error when 2nd parameter is not an array of objects', t => {
  t.throws(() => sort(input, { dir: 'desc' }), Error);
});

test('throws an error when passing invalid value for "key"', t => {
  t.throws(() => sort(input, { dir: 'desc' }), Error);
});

test('throws an error when passing invalid value for "dir"', t => {
  t.throws(() => sort(input, { key: 'updated_at', dir: 'invalid' }), Error);
});
