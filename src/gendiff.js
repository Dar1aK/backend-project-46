import _ from "lodash";
import parseFiles from "./parseFiles.js";

const getUnionObject = (data1, data2) => {
  const result = {};
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);

  for (const key of keys) {
    if (!Object.hasOwn(data1, key)) {
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

const getGenDiff = (filepath1, filepath2) => {
  const { data1, data2 } = parseFiles(filepath1, filepath2);

  const resultObject = getUnionObject(data1, data2);

  const sortedResult = _(resultObject)
    .toPairs()
    .sortBy([
      ([key]) => {
        const objectKeys = key.split(" ");
        const sortByKey = objectKeys[1] || objectKeys[0];
        const sortBySign = objectKeys[0] === "-" ? -1 : 1;
        return [sortByKey, sortBySign];
      },
    ])
    .fromPairs()
    .value();
  console.log(sortedResult);
  return sortedResult;
};
export default getGenDiff;
