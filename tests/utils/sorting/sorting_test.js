import test from 'ava';
import sort from '../../../src/utils/sorting';

let input;

test.beforeEach(t => {
  input = [
    { id: 3, watchers: 1,  name: 'cherry' },
    { id: 2, watchers: 5,  name: 'banana' },
    { id: 1, watchers: 10, name: 'apples'  }
  ];
});

test('does not mutate original array', t => {
  const result = sort(input);
  const durian = { id: 4, name: 'durian', watchers: 15 };

  result.unshift(durian);
  t.is(input.length, 3);

  const expected = [
    durian,
    { id: 1, name: 'apples', watchers: 10 },
    { id: 2, name: 'banana', watchers: 5 },
    { id: 3, name: 'cherry', watchers: 1 }
  ];

  t.notDeepEqual(input, expected);
  t.deepEqual(result, expected);
});

test('can handle sorting objects', t => {
  const actual = sort(input);
  const expected = [
    { id: 1, name: 'apples', watchers: 10 },
    { id: 2, name: 'banana', watchers: 5 },
    { id: 3, name: 'cherry', watchers: 1 }
  ];

  t.deepEqual(actual, expected);
});
