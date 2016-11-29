import { fetchUser, fetchUserRepos } from '../../src/api';
import { extractNextPageUrl } from '../../src/api/_common';

export { fetchUser, fetchUserRepos, extractNextPageUrl };
export const linkHeaders = {
  'Link': '<https://api.github.com/user/5211680/repos?sort=updated&direction=desc&page=2>; rel="next", <https://api.github.com/user/5211680/repos?sort=updated&direction=desc&page=2>; rel="last"'
};
