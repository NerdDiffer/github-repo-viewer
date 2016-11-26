export const BASE_URL = 'https://api.github.com';

const logErrToConsole = response => {
  const keys = Object.keys(response);
  console.log('keys on response object:\n', keys);

  const { status, statusText, headers, url, body, timeout } = response;

  console.log('url: %s', url);
  console.log('status: %s', status);
  console.log('statusText: %s', statusText);
  console.log('timeout: %s', timeout);
  console.log('headers:\n', headers);
  console.log('body:\n', body);
};

const extractNextPageUrl = response => {
  const link = response.headers.get('link');
  if (!link) { return null; }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
  if (!nextLink) { return null; }

  return nextLink.split(';')[0].slice(1, -1)
}

export const preProcessResponse = (response, { debug = false } = {}) => (
  response.json()
    .then(json => {
      if (response.status >= 400) {
        if (debug) { logErrToConsole(response); }
        throw new Error(json);
      } else {
        const nextPageUrl = extractNextPageUrl(response);
        return Object.assign({}, { repos: json }, { nextPageUrl });
      }
    })
);
