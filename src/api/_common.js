export const BASE_URL = 'https://api.github.com';

export const fetchConfig = {
  header: {
    Accept: 'application/vnd.github.v3+json'
  }
};

const extractNextPageUrl = response => {
  const link = response.headers.get('link');
  if (!link) { return null; }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
  if (!nextLink) { return null; }

  return nextLink.split(';')[0].slice(1, -1)
}

export const preProcessResponse = response => (
  response.json()
    .then(json => {
      if (response.status >= 400) {
        throw new Error(json);
      } else {
        const nextPageUrl = extractNextPageUrl(response);
        return { json, nextPageUrl };
      }
    })
);
