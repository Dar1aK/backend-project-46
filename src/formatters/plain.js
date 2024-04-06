const ACTIONS = {
  added: 'added',
  removed: 'removed',
  updated: 'updated',
};

const isObject = (value) => typeof value === 'object'
&& !Array.isArray(value)
&& value !== null;

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

const getAction = (arr, i, arrKeys, val) => {
  if (
    arr[i + 1]?.[0].split(' ')[1]
    && arr[i + 1][0].split(' ')[1] === arrKeys[1]
  ) {
    return {
      action: ACTIONS.updated,
      newValue: arr[i + 1]?.[1],
      oldValue: val,
    };
  }
  if (arrKeys[0] === '+' && arr[i - 1]?.[0].split(' ')[1] !== arrKeys[1]) {
    return {
      action: ACTIONS.added,
      newValue: val,
      isEnd: isObject(val),
    };
  }
  if (arrKeys[0] === '-') {
    return {
      action: ACTIONS.removed,
      isEnd: isObject(val),
    };
  }
  return {};
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
}) => Object.entries(value).reduce((acc, [key, val], i, arr) => {
  const isStartsWithSign = key.startsWith('+') || key.startsWith('-');
  const arrKeys = key.split(' ');
  const newKey = (() => {
    const compareWithSign = arrKeys[1];
    const defaultValue = key;
    return (
      (string ? '.' : '')
      + (isStartsWithSign ? compareWithSign : defaultValue)
    );
  })();
  const action = getAction(arr, i, arrKeys, val);

  if (action.isEnd) {
    return acc + iter(null, `${string}${newKey}`, action, result);
  }

  return acc + iter(val, `${string}${newKey}`, action, result);
}, '');

const plain = (tree) => {
  const iter = (value, string, actionObject, tempResult = '') => {
    const result = `${tempResult}${combineLine(actionObject, string)}`;
    if (!value || typeof value !== 'object') {
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
