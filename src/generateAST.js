import _ from 'lodash';
import { ACTIONS } from './utils.js';

export const generateAST = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = (data2 && typeof data2 !== 'object') || Array.isArray(data2)
    ? data2
    : Object.keys(data2);
  const keys = _.union(keys1, keys2);
  const result = keys.reduce((acc, key) => {
    if (typeof data1[key] === 'object' && !Array.isArray(data1[key])) {
      if (data2[key] === undefined) {
        const value = {
          type: ACTIONS.removed,
          oldValue: data1[key],
        };
        return { ...acc, [key]: value };
      }
      if (typeof data2[key] !== 'object') {
        const value = {
          type: ACTIONS.updated,
          oldValue: data1[key],
          newValue: data2[key],
        };
        return { ...acc, [key]: value };
      }
      const value = {
        type: ACTIONS.nested,
        oldValue: data1[key],
        newValue: generateAST(data1[key], data2[key] || {}),
      };
      return {
        ...acc,
        [key]: value,
      };
    }
    if (!Object.hasOwn(data1, key)) {
      const value = { type: ACTIONS.added, newValue: data2[key] };
      return { ...acc, [key]: value };
    }
    if (!Object.hasOwn(data2, key)) {
      const value = {
        type: ACTIONS.removed,
        oldValue: data1[key],
      };
      return { ...acc, [key]: value };
    }
    if (data1[key] !== data2[key]) {
      const value = {
        type: ACTIONS.updated,
        oldValue: data1[key],
        newValue: data2[key],
      };
      return { ...acc, [key]: value };
    }
    const value = { newValue: data2[key] };
    return { ...acc, [key]: value };
  }, {});

  return result;
};

export const sortedByKey = (resultObject) => {
  const sorted = _(resultObject)
    .toPairs()
    .sortBy([
      ([key]) => [key],
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
