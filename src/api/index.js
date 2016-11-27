import { BASE_URL, preProcessResponse, fetchConfig as config } from './_common';

// GET /users/:username/repos
export const fetchUserRepos = username => {
  const url = `${BASE_URL}/users/${username}/repos?per_page=100`;
  return fetch(url, config)
    .then(response => preProcessResponse(response))
    .then(({ json, nextPageUrl }) => ({ repos: json, nextPageUrl }));
};

// GET /users/:username
export const fetchUser = username => {
  const url = `${BASE_URL}/users/${username}`;
  return fetch(url, config)
    .then(response => preProcessResponse(response))
    .then(({ json }) => ({ user: json }));
};
