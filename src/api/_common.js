export const BASE_URL = 'https://api.github.com';

export const fetchConfig = {
  header: {
    Accept: 'application/vnd.github.v3+json'
  }
};

export const extractNextPageUrl = link => {
  if (!link) { return null; }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
  if (!nextLink) { return null; }

  return nextLink.split(';')[0].slice(1, -1)
}

export const preProcessResponse = response => {
  return response.json()
    .then(json => {
      const { status, statusText, ok } = response;

      if (!ok) {
        const err = { status, statusText, ok, json };
        return Promise.reject(err);
      } else {
        const link = response.headers.get('link');
        const nextPageUrl = extractNextPageUrl(link);
        return { status, statusText, ok, json, nextPageUrl };
      }
    })
};
