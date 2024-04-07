import yaml from 'js-yaml';

const parseFile = (fileString, format) => {
  switch (format) {
    case 'yml':
    case 'yaml':
      return yaml.load(fileString);
    case 'json':
      return JSON.parse(fileString);
    default:
      return new Error('No format loader for this file');
  }
};

export default parseFile;
