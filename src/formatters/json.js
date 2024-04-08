import { ACTIONS, getSign } from '../utils.js';

const formatInJson = (data) => {
  const iter = (value, depth) => {
    if (!value || typeof value !== 'object') {
      return value;
    }
    const result = Object.entries(value).reduce((acc, [key, val]) => {
      if (val.type === ACTIONS.updated) {
        return { ...acc, [`- ${key}`]: iter(val.oldValue, depth + 1), [`+ ${key}`]: iter(val.newValue, depth + 1) };
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

      return { ...acc, [`${sign ? `${sign} ` : ''}${key}`]: iter(getValue, depth + 1) };
    }, {});
    return result;
  };
  const iterResult = iter(data, 0);
  return JSON.stringify(iterResult);
};

export default formatInJson;
