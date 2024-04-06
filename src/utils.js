export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const ACTIONS = {
  added: 'added',
  removed: 'removed',
  updated: 'updated',
  nested: 'nested',
};

export const getSign = (objectKeys) => {
  if (objectKeys.type === 'added') {
    return '+ ';
  }
  if (objectKeys.type === 'removed') {
    return '- ';
  }
  return '';
};
