import { ACTIONS, getSign } from '../utils.js';

const createResultStrings = (iter) => (acc, [key, val], replacer, spacesCount, depth) => {
  const signWidth = val.type === ACTIONS.added
    || val.type === ACTIONS.removed
    || val.type === ACTIONS.updated
    ? 2
    : 0;

  if (val.type === ACTIONS.updated) {
    return (
      `${acc
      + replacer.repeat(spacesCount * (depth + 1) - signWidth)
      }- ${key}: ${iter(val.oldValue, depth + 1)}\n${replacer.repeat(spacesCount * (depth + 1) - signWidth)
      }+ ${key}: ${iter(val.newValue, depth + 1)}\n`
    );
  }

  const sign = getSign(val);
  const getValue = (() => {
    if (sign === '-') {
      return val.oldValue;
    }
    if (sign === '+' || val.newValue) {
      return val.newValue;
    }
    return val;
  })();

  return (
    `${acc
    + replacer.repeat(spacesCount * (depth + 1) - signWidth)
    }${sign ? `${sign} ` : ''}${key}: ${iter(getValue, depth + 1)}\n`
  );
};

const stylish = (tree, replacer = ' ', spacesCount = 4) => {
  const iter = (value, depth) => {
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
