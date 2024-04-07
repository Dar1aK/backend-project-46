import { ACTIONS, isJsonString } from '../utils.js';

const printValue = (value) => {
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const combineLine = (actionObject, string) => {
  if (actionObject.action === ACTIONS.added) {
    return `\nProperty '${string}' was added with value: ${printValue(actionObject.newValue)}`;
  }
  if (actionObject.action === ACTIONS.removed) {
    return `\nProperty '${string}' was removed`;
  }
  if (actionObject.action === ACTIONS.updated) {
    return `\nProperty '${string}' was updated. From ${printValue(actionObject.oldValue)} to ${printValue(actionObject.newValue)}`;
  }
  return '';
};

const plainIteration = ({
  value, iter, string, result,
}) => Object.entries(value).reduce((acc, [key, val]) => {
  const objectKeys = isJsonString(key) ? JSON.parse(key) : key;
  const newKey = (() => {
    const defaultValue = objectKeys.title || objectKeys;
    return (
      (string ? '.' : '')
      + defaultValue
    );
  })();

  const action = {
    action: objectKeys.type,
    newValue: objectKeys.newValue,
    oldValue: objectKeys.oldValue,
  };

  return acc + iter(val, `${string}${newKey}`, action, result);
}, '');

const plain = (tree) => {
  const iter = (value, string, actionObject, tempResult = '') => {
    const result = `${tempResult}${combineLine(actionObject, string)}`;

    if (Object.hasOwn(actionObject, 'action') && !actionObject.action) {
      return '';
    }

    if (actionObject.action && actionObject.action !== ACTIONS.nested) {
      return result;
    }

    const objectsResult = plainIteration({
      value, iter, string, result,
    });
    return objectsResult;
  };

  const res = iter(tree, '', {});
  return res.slice(1);
};
export default plain;
