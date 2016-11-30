import deepClone from 'lodash.clonedeep';

const sortAsc = (a, b) => {
  if (a < b) { return -1; } // puts `a` first
  if (a > b) { return 1; } // puts `b` first
  return 0;
};

const sortDesc = (a, b) => {
  if (a < b) { return 1; } // puts `b` first
  if (a > b) { return -1; } // puts `a` first
  return 0;
};

const comparatorFns = {
  asc: sortAsc,
  desc: sortDesc,
  compareRows: (compareFn, key, rowA, rowB) => {
    const valA = rowA[key];
    const valB = rowB[key];

    const comparison = compareFn(valA, valB);

    if (comparison === 0) {
      // compare by 'updated_at' by putting the most recently updated repo first
      return sortDesc(rowA.updated_at, rowB.updated_at);
    } else {
      return comparison;
    }
  }
};

/**
 * Pre-check sorting criteria. Does not check comparative objects for property
 * existence. So, another mechanism would be needed to compare with undefined.
 * @param criteria, {Object} object must have keys: 'dir', 'key'.
 * @return, {Boolean} returns true if criteria is valid
 * @throws, {Error} if something is invalid
 */
const validateSortCriteria = ({ key, dir }) => {
  if (typeof key !== 'string') {
    throw new Error('Must pass in a "key" (as a string) to compare objects. You passed in', key);
  }
  if (['asc', 'desc'].indexOf(dir) < 0) {
    throw new Error('Must sort in one of these two directions: "asc" or "desc". You passed in', dir);
  }

  return true;
};

/**
 * Sort objects in-place, according to a common criteria on each object.
 * @param rows {Array}, collection of objects.
 * @param key {String}, name of property on the object, the criteria to sort by.
 * @param direction {String}, the direction to sort by ('asc' or 'desc').
 */
const sortObjsBy = (rows, { key, dir }) => {
  const directionalCompare = comparatorFns[dir];
  const { compareRows } = comparatorFns;
  const directionallyCompareObjs = compareRows.bind(null, directionalCompare, key);

  return directionallyCompareObjs;
};

/**
 * - does *not* mutate original array
 * - handles object sorting
 * - sort by multiple criteria:
 *   - 'watchers', in desc order
 *   - 'name' in asc/desc order || 'updated_at' in asc/desc order
 */
export default (arr, sortCriteria) => {
  const copy = deepClone(arr);

  let sortBy;

  if (!sortCriteria) {
    sortBy = sortObjsBy(copy, { key: 'watchers', dir: 'desc' })
  } else {
    validateSortCriteria(sortCriteria);
    sortBy = sortObjsBy(copy, sortCriteria);
  }

  return copy.sort(sortBy);
};
