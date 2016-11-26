import test from 'ava';
import sort from '../../src/utils/sorting';

test('does not mutate original array', t => {
  const input = [
    { id: 3, name: 'cranberries', watchers: 1 },
    { id: 2, name: 'bananas', watchers: 5 },
    { id: 1, name: 'apples', watchers: 10 }
  ];

  const result = sort(input, 'watchers');
  const durian = { id: 4, name: 'durian', watchers: 15 };

  result.unshift(durian);
  t.is(input.length, 3);

  const expected = [
    durian,
    { id: 1, name: 'apples', watchers: 10 },
    { id: 2, name: 'bananas', watchers: 5 },
    { id: 3, name: 'cranberries', watchers: 1 }
  ];

  t.notDeepEqual(input, expected);
  t.deepEqual(result, expected);
});

test('can handle sorting objects', t => {
  const input = [
    { id: 3, name: 'cranberries', watchers: 1 },
    { id: 2, name: 'bananas', watchers: 5 },
    { id: 1, name: 'apples', watchers: 10 }
  ];

  const actual = sort(input, 'watchers');
  const expected = [
    { id: 1, name: 'apples', watchers: 10 },
    { id: 2, name: 'bananas', watchers: 5 },
    { id: 3, name: 'cranberries', watchers: 1 }
  ];

  t.deepEqual(actual, expected);
});

test('can handle sorting objects by multiple criteria', t => {
  const input = [
    { id: 3, name: 'cranberries', watchers: 1 },
    { id: 2, name: 'bananas', watchers: 5 },
    { id: 1, name: 'apples', watchers: 5 }
  ];

  const actual = sort(input, ['watchers', 'name']);
  const expected = [
    { id: 1, name: 'apples', watchers: 5 },
    { id: 2, name: 'bananas', watchers: 5 },
    { id: 3, name: 'cranberries', watchers: 1 }
  ];

  t.deepEqual(actual, expected);
});
