import { getSign, isJsonString } from '../utils.js';

const formatInJson = (data) => {
  const iter = (valueUnparsed, depth) => {
    const value = isJsonString(valueUnparsed) ? JSON.parse(valueUnparsed) : valueUnparsed;
    if (!value || typeof value !== 'object') {
      return value;
    }
    const result = Object.entries(value).reduce((acc, [key, val]) => {
      const objectKeys = isJsonString(key) ? JSON.parse(key) : key;
      const propertyName = objectKeys.title || objectKeys;
      if (objectKeys.type === 'updated') {
        return { ...acc, [`- ${propertyName}`]: iter(objectKeys.oldValue, depth + 1), [`+ ${propertyName}`]: iter(objectKeys.newValue, depth + 1) };
      }
      return { ...acc, [`${getSign(objectKeys)}${propertyName}`]: iter(val, depth + 1) };
    }, {});
    return result;
  };
  const iterResult = iter(data, 0);
  return JSON.stringify(iterResult);
};

export default formatInJson;
