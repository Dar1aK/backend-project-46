import _ from 'lodash';
import { ACTIONS, isJsonString } from './utils.js';

export const generateAST = (data1, data2) => {
    const keys1 = Object.keys(data1);
    const keys2 = (data2 && typeof data2 !== 'object') || Array.isArray(data2)
      ? data2
      : Object.keys(data2);
    const keys = _.union(keys1, keys2);
    const result = keys.reduce((acc, key) => {
      if (typeof data1[key] === 'object' && !Array.isArray(data1[key])) {
        if (data2[key] === undefined) {
          const newKey = { type: ACTIONS.removed, title: key, oldValue: data1[key] };
          return { ...acc, [JSON.stringify(newKey)]: data1[key] };
        }
        if (typeof data2[key] !== 'object') {
          const newKey = {
            type: ACTIONS.updated, title: key, oldValue: data1[key], newValue: data2[key],
          };
          return { ...acc, [JSON.stringify(newKey)]: data2[key] };
        }
        const newKey = {
          type: ACTIONS.nested,
          title: key,
          oldValue: data1[key],
          newValue: generateAST(
            data1[key],
            data2[key] || {},
          ),
        };
        return { ...acc, [JSON.stringify(newKey)]: generateAST(data1[key], data2[key] || {}) };
      }
      if (!Object.hasOwn(data1, key)) {
        const newKey = { type: ACTIONS.added, title: key, newValue: data2[key] };
        return { ...acc, [JSON.stringify(newKey)]: data2[key] };
      }
      if (!Object.hasOwn(data2, key)) {
        const newKey = { type: ACTIONS.removed, title: key, oldValue: data1[key] };
        return { ...acc, [JSON.stringify(newKey)]: data1[key] };
      }
      if (data1[key] !== data2[key]) {
        const newKey = {
          type: ACTIONS.updated, title: key, oldValue: data1[key], newValue: data2[key],
        };
        return { ...acc, [JSON.stringify(newKey)]: data2[key] };
      }
      const newKey = { title: key };
      return { ...acc, [JSON.stringify(newKey)]: data1[key] };
    }, {});
  
    return result;
  };
  
export const sortedByKey = (resultObject) => {
    const sorted = _(resultObject)
      .toPairs()
      .sortBy([
        ([key]) => {
          const objectKeys = isJsonString(key) ? JSON.parse(key) : key;
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