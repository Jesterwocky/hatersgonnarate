export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function hasKey(obj, key) {
  return Object.keys(obj).indexOf(key) !== -1;
}

export function hasItem(arr, item) {
  return arr.indexOf(item) !== -1;
}
