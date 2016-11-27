/**
 * @param isoDate, {String} an ISO 8601 string. ie: 2014-10-17T09:17:43Z
 * @return, {String} shortened version. ie: 2014-10-17
 */
export const shortIso = isoDate => isoDate.slice(0, 10);
