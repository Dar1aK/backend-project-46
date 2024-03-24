import _ from "lodash";
import parseFiles from "./parsers.js";

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
        result[`  ${key}`] = getUnionObject(data1[key], data2[key] || {});
      }
    } else if (!Object.hasOwn(data1, key)) {
      result[`+ ${key}`] = data2[key];
    } else if (!Object.hasOwn(data2, key)) {
      result[`- ${key}`] = data1[key];
    } else if (data1[key] !== data2[key]) {
      result[`- ${key}`] = data1[key];
      result[`+ ${key}`] = data2[key];
    } else {
      result[`  ${key}`] = data1[key];
    }
  }
  return result;
};

//2 spaces
const addSpace = (depth) =>
  Array(depth)
    .fill()
    .reduce((acc) => acc + "  ", "");

const stylish = (tree) => {
  const iter = ({ child: node, depth, key, isEnd }) => {
    const space = addSpace(depth);

    if (!node || typeof node !== "object" || Array.isArray(node)) {
      console.log(`${space}${key} ${node}`);
      if (isEnd) {
        console.log(`${addSpace(depth - 1)}}`);
      }
      return;
    }

    console.log(`${space}${key ? `${key}: ` : ""}{ `);

    const children = node && Object.entries(node);

    return children?.map(([key, child], i, arr) => {
      // console.log("arr", arr, arr[i], arr[i + 1]);
      return iter({
        child,
        depth: depth + 1,
        key,
        isEnd: !arr[i + 1],
      });
    });
  };

  return iter({ child: tree, depth: 0 });
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

const getGenDiff = (filepath1, filepath2) => {
  const { data1, data2 } = parseFiles(filepath1, filepath2);

  const resultObject = getUnionObject(data1, data2);

  const sortedResult = sortedByKeyAndSign(resultObject);

  return stylish(sortedResult);
};
export default getGenDiff;
