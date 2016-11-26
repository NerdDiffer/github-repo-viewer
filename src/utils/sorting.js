import deepClone from 'lodash.clonedeep';

const comparatorFns = {
  asc:  (a, b) => a > b,
  desc: (a, b) => a < b,
  compareRows: (compareFn, key, rowA, rowB) => {
    const valA = rowA[key];
    const valB = rowB[key];
    return compareFn(valA, valB);
  }
};

/**
 * Sort objects in-place, according to a common criteria on each object.
 * @param rows {Array}, collection of objects.
 * @param key {String}, name of property on the object, the criteria to sort by.
 * @param direction {String}, the direction to sort by ('asc' or 'desc').
 */
const sortObjsBy = (rows, key, direction = 'asc') => {
  if (typeof key !== 'string') {
    throw new Error('Must pass in a "key" (as a string) to compare objects.');
  }
  if (['asc', 'desc'].indexOf(direction) < 0) {
    throw new Error('Must sort in one of these two directions: "asc" or "desc"');
  }

  const directionalCompare = comparatorFns[direction];
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
const sort = (arr, multipleSortOpts) => {
  const copy = deepClone(arr);

  let secondarySort;

  if (!multipleSortOpts) {
    // then sort equal elements (according to num of watchers) by falling back
    // to a default sort
    secondarySort = sortObjsBy(copy, 'name', 'asc')
  } else {
    const { key, dir } = multipleSortOpts;
    secondarySort = sortObjsBy(copy, key, dir);
  }

  return copy.sort((a, b) => {
    // compare by watchers, descending order
    const watchersA = a.watchers;
    const watchersB = b.watchers;

    if (watchersA < watchersB) {
      return 1; // put `b` first
    } else if (watchersA > watchersB) {
      return -1; // put `a` first
    } else {
      return secondarySort(a, b);
    }
  });
};

export default sort;
