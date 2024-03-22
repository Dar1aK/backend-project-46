import _ from "lodash";
import path from "path";
import fs from "fs";

const getGenDiff = (filepath1, filepath2) => {
  let path1;
  let path2;

  if (!filepath1.startsWith(".")) {
    path1 = `${process.cwd()}${filepath1}`;
  } else {
    path1 = filepath1;
  }

  if (!filepath2.startsWith(".")) {
    path2 = `${process.cwd()}${filepath2}`;
  } else {
    path2 = filepath2;
  }

  const data1 = JSON.parse(fs.readFileSync(path.resolve(path1), "utf-8"));
  const data2 = JSON.parse(fs.readFileSync(path.resolve(path2), "utf-8"));

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

  const sortedResult = _(result)
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
};
export default getGenDiff;
