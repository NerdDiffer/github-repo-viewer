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

export const preProcessResponse = (response, { debug = false } = {}) => {
  if (response.status >= 400) {
    if (debug) { logErrToConsole(response); }

    const { status, statusText, url  } = response;
    const err = { status, statusText, url, message: 'Bad request' };
    const json = JSON.stringify(err);

    throw new Error(json);
  } else {
    return response.json();
  }
};

export const BASE_URL = 'https://api.github.com';
