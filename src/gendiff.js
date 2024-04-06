import _ from 'lodash';
import parseFiles from './parsers.js';
import { json, stylish, plain } from './formatters/index.js';
import { ACTIONS } from './utils.js';

const getUnionObject = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = (data2 && typeof data2 !== 'object') || Array.isArray(data2)
    ? data2
    : Object.keys(data2);
  const keys = _.union(keys1, keys2);
  const result = keys.reduce((acc, key) => {
    if (typeof data1[key] === 'object' && !Array.isArray(data1[key])) {
      if (data2[key] === undefined) {
        const newKey = { type: ACTIONS.removed, title: key, oldValue: data1[key] };
        return { ...acc, [JSON.stringify(newKey)]: JSON.stringify(data1[key]) };
      }
      if (typeof data2[key] !== 'object') {
        const newKey = {
          type: ACTIONS.updated, title: key, oldValue: data1[key], newValue: data2[key],
        };
        return { ...acc, [JSON.stringify(newKey)]: JSON.stringify(data2[key]) };
      }
      const newKey = {
        type: ACTIONS.nested,
        title: key,
        oldValue: data1[key],
        newValue: getUnionObject(
          data1[key],
          data2[key] || {},
        ),
      };
      return { ...acc, [JSON.stringify(newKey)]: getUnionObject(data1[key], data2[key] || {}) };
    }
    if (!Object.hasOwn(data1, key)) {
      const newKey = { type: ACTIONS.added, title: key, newValue: data2[key] };
      return { ...acc, [JSON.stringify(newKey)]: JSON.stringify(data2[key]) };
    }
    if (!Object.hasOwn(data2, key)) {
      const newKey = { type: ACTIONS.removed, title: key, oldValue: data1[key] };
      return { ...acc, [JSON.stringify(newKey)]: JSON.stringify(data1[key]) };
    }
    if (data1[key] !== data2[key]) {
      const newKey = {
        type: ACTIONS.updated, title: key, oldValue: data1[key], newValue: data2[key],
      };
      return { ...acc, [JSON.stringify(newKey)]: JSON.stringify(data2[key]) };
    }
    const newKey = { title: key };
    return { ...acc, [JSON.stringify(newKey)]: JSON.stringify(data1[key]) };
  }, {});

  return result;
};

const sortedByKey = (resultObject) => {
  const sorted = _(resultObject)
    .toPairs()
    .sortBy([
      ([key]) => {
        const objectKeys = key ? JSON.parse(key) : key;
        return [objectKeys.title];
      },
    ])
    .fromPairs()
    .value();

  const withSortedChildren = Object.entries(sorted).map(([key, children]) => {
    if (children && typeof children === 'object' && !Array.isArray(children)) {
      return [key, sortedByKey(children)];
    }
    return [key, children];
  });

  return Object.fromEntries(withSortedChildren);
};

const formatterFn = (data) => (formatterName) => {
  switch (formatterName) {
    case 'plain':
      return plain(data);
    case 'json':
      return json(data);
    default:
      return stylish(data);
  }
};

const getGenDiff = (filepath1, filepath2, formatter) => {
  const { data1, data2 } = parseFiles(filepath1, filepath2);
  const resultObject = getUnionObject(data1, data2);
  const sortedResult = sortedByKey(resultObject);

  return formatterFn(sortedResult)(formatter);
};
export default getGenDiff;
