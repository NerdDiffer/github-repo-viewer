import { BASE_URL, preProcessResponse } from './_common';

// GET /users/:username/repos
export const fetchUserRepos = username => {
  const url = `${BASE_URL}/users/${username}/repos?per_page=100`;
  const config = {
    header: {
      Accept: 'application/vnd.github.v3+json'
    }
  };

  return fetch(url, config)
    .then(response => preProcessResponse(response))
    .then(({ json, nextPageUrl }) => ({ repos: json, nextPageUrl }));
};
