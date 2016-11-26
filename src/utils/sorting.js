import deepClone from 'lodash.clonedeep';

/**
 * - does *not* mutate original array
 * - handles object sorting
 * - sort by multiple criteria:
 *   - 'watchers', in descending order
 *   - 'name' in ascending order
 */
const sort = (arr) => {
  const copy = deepClone(arr);

  return copy.sort((a, b) => {
    // compare by watchers, descending order
    const watchersA = a.watchers;
    const watchersB = b.watchers;

    if (watchersA < watchersB) {
      return 1; // put `b` first
    } else if (watchersA > watchersB) {
      return -1; // put `a` first
    } else {
      // compare by name, ascending order
      const nameA = a.name;
      const nameB = b.name;

      if (nameA < nameB) {
        return -1; // put `a` first
      } else if (nameA > nameB) {
        return 1; // put `b` first
      } else {
        // probably won't happen b/c we're comparing repos by an individual user
        // and github forces user repo names to be unique.
        return 0;
      }
    }
  });
};

export default sort;
