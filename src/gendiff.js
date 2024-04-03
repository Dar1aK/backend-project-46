import _ from 'lodash';
import parseFiles from './parsers.js';
import { json, stylish, plain } from './formatters/index.js';

const getUnionObject = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = (data2 && typeof data2 !== 'object') || Array.isArray(data2)
    ? data2
    : Object.keys(data2);
  const keys = _.union(keys1, keys2);

  const result = keys.reduce((acc, key) => {
    if (typeof data1[key] === 'object' && !Array.isArray(data1[key])) {
      if (data2[key] === undefined) {
        return { ...acc, [`- ${key}`]: data1[key] };
      }

      if (typeof data2[key] !== 'object') {
        return { ...acc, [`- ${key}`]: data1[key], [`+ ${key}`]: data2[key] };
      }
      return { ...acc, [key]: getUnionObject(data1[key], data2[key] || {}) };
    }
    if (!Object.hasOwn(data1, key)) {
      return { ...acc, [`+ ${key}`]: data2[key] };
    }

    if (!Object.hasOwn(data2, key)) {
      return { ...acc, [`- ${key}`]: data1[key] };
    }
    if (data1[key] !== data2[key]) {
      return { ...acc, [`- ${key}`]: data1[key], [`+ ${key}`]: data2[key] };
    }
    return { ...acc, [key]: data1[key] };
  }, {});

  return result;
};

const sortedByKeyAndSign = (resultObject) => {
  const sorted = _(resultObject)
    .toPairs()
    .sortBy([
      ([key]) => {
        const objectKeys = key.replace(/ {2}/g, ' ').split(' ');
        const sortByKey = objectKeys[1] || objectKeys[0];
        const sortBySign = objectKeys[0] === '-' ? -1 : 1;
        return [sortByKey, sortBySign];
      },
    ])
    .fromPairs()
    .value();

  const withSortedChildren = Object.entries(sorted).map(([key, children]) => {
    if (children && typeof children === 'object' && !Array.isArray(children)) {
      return [key, sortedByKeyAndSign(children)];
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

  const sortedResult = sortedByKeyAndSign(resultObject);

  return formatterFn(sortedResult)(formatter);
};
export default getGenDiff;
