import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const makeFormatter = (formatName, data) => {
  switch (formatName) {
    case 'plain':
      return plain(data);
    case 'json':
      return json(data);
    case 'stylish':
    case undefined:
      return stylish(data);
    default:
      return new Error(`No formatter for this format name: '${formatName}'`);
  }
};

export {
  stylish, plain, json, makeFormatter,
};
