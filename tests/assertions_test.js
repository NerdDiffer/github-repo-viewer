import test from 'ava';
import { isObject } from './assertions';

test('isObject', t => {
  t.false(isObject(null));
  t.false(isObject([]));
  t.true(isObject({}));

  t.false(isObject(function() {}));

  class Dummy { constructor() {} }
  t.true(isObject(new Dummy()));
  t.false(isObject(Dummy));
});
