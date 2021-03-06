import { stringify } from 'querystring';
import { BASE_URL, preProcessResponse, fetchConfig as config } from './_common';

// GET /users/:username/repos
export const fetchUserRepos = username => {
  const params = stringify({
    per_page: 100,
    sort: 'updated',
    direction: 'desc'
  });

  const url = `${BASE_URL}/users/${username}/repos?${params}`;
  return fetch(url, config)
    .then(response => preProcessResponse(response));
};

// GET /users/:username
export const fetchUser = username => {
  const url = `${BASE_URL}/users/${username}`;
  return fetch(url, config)
    .then(response => preProcessResponse(response));
};
