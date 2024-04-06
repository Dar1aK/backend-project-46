import { getSign, isJsonString } from '../utils.js';

const createResultStrings = (iter) => (acc, [key, val], replacer, spacesCount, depth) => {
  const objectKeys = isJsonString(key) ? JSON.parse(key) : key;
  const signWidth = objectKeys.type === 'added' || objectKeys.type === 'removed' || objectKeys.type === 'updated' ? 2 : 0;
  const propertyName = objectKeys.title || objectKeys;

  if (objectKeys.type === 'updated') {
    return (
      `${acc
      + replacer.repeat(spacesCount * (depth + 1) - signWidth)
      }- ${propertyName}: ${iter(objectKeys.oldValue, depth + 1)}\n${replacer.repeat(spacesCount * (depth + 1) - signWidth)
      }+ ${propertyName}: ${iter(objectKeys.newValue, depth + 1)}\n`
    );
  }

  return (
    `${acc
    + replacer.repeat(spacesCount * (depth + 1) - signWidth)
    }${getSign(objectKeys)}${propertyName}: ${iter(val, depth + 1)}\n`
  );
};

const stylish = (tree, replacer = ' ', spacesCount = 4) => {
  const iter = (valueUnparsed, depth) => {
    const value = isJsonString(valueUnparsed) ? JSON.parse(valueUnparsed) : valueUnparsed;
    if (!value || typeof value !== 'object') {
      return value;
    }

    const result = `{\n${
      Object.entries(value).reduce((acc, item) => createResultStrings(iter)(acc, item, replacer, spacesCount, depth), '')
    }${replacer.repeat(spacesCount * depth)}}`;

    return result;
  };

  const iterResult = iter(tree, 0);

  return iterResult;
};

export default stylish;
