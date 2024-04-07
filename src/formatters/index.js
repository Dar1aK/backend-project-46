import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatterFn = (data) => (formatterName) => {
  switch (formatterName) {
    case 'plain':
      return plain(data);
    case 'json':
      return json(data);
    case 'stylish':
    case undefined:
      return stylish(data);
    default:
      return new Error(`No formatter for this formatter name: '${formatterName}'`);
  }
};

export {
  stylish, plain, json, formatterFn,
};
