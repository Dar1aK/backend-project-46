import { default as stylish } from './stylish.js';
import { default as plain } from './plain.js';
import { default as json } from './json.js';

const formatterFn = (data) => (formatterName) => {
    switch (formatterName) {
      case 'plain':
        return plain(data);
      case 'json':
        return json(data);
      default:
        return stylish(data);
    }
  };

export {stylish, plain, json, formatterFn}