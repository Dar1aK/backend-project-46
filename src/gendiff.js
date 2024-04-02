import _ from "lodash";
import parseFiles from "./parsers.js";
import stylish from "./formatters/stylish.js";

const getUnionObject = (data1, data2) => {
  const result = {};
  const keys1 = Object.keys(data1);
  const keys2 =
    (data2 && typeof data2 !== "object") || Array.isArray(data2)
      ? data2
      : Object.keys(data2);
  const keys = _.union(keys1, keys2);

  for (const key of keys) {
    if (typeof data1[key] === "object" && !Array.isArray(data1[key])) {
      if (data2[key] === undefined) {
        result[`- ${key}`] = data1[key];
      } else if (typeof data2[key] !== "object") {
        result[`- ${key}`] = data1[key];
        result[`+ ${key}`] = data2[key];
      } else {
        result[key] = getUnionObject(data1[key], data2[key] || {});
      }
    } else if (!Object.hasOwn(data1, key)) {
      result[`+ ${key}`] = data2[key];
    } else if (!Object.hasOwn(data2, key)) {
      result[`- ${key}`] = data1[key];
    } else if (data1[key] !== data2[key]) {
      result[`- ${key}`] = data1[key];
      result[`+ ${key}`] = data2[key];
    } else {
      result[key] = data1[key];
    }
  }
  return result;
};

const sortedByKeyAndSign = (resultObject) => {
  const sorted = _(resultObject)
    .toPairs()
    .sortBy([
      ([key]) => {
        const objectKeys = key.replace(/ {2}/g, " ").split(" ");
        const sortByKey = objectKeys[1] || objectKeys[0];
        const sortBySign = objectKeys[0] === "-" ? -1 : 1;
        return [sortByKey, sortBySign];
      },
    ])
    .fromPairs()
    .value();

  const withSortedChildren = Object.entries(sorted).map(([key, children]) => {
    if (children && typeof children === "object" && !Array.isArray(children)) {
      return [key, sortedByKeyAndSign(children)];
    }
    return [key, children];
  });

  return Object.fromEntries(withSortedChildren);
};

const getGenDiff = (filepath1, filepath2, formatter) => {
  const { data1, data2 } = parseFiles(filepath1, filepath2);

  const resultObject = getUnionObject(data1, data2);

  const sortedResult = sortedByKeyAndSign(resultObject);

  console.log("formatter", formatter, typeof formatter);

  const formatterFn = (formatter && typeof formatter === "function") || stylish;
  console.log("formatterFn", formatterFn);
  return formatterFn(sortedResult);
};
export default getGenDiff;
