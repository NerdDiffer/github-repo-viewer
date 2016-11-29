import test from 'ava';
import { linkHeaders, extractNextPageUrl } from './helpers';

test('extracting url of next page', t => {
  const actual = extractNextPageUrl(linkHeaders['Link']);
  const expected = 'https://api.github.com/user/5211680/repos?sort=updated&direction=desc&page=2';
  t.is(actual, expected);
});
