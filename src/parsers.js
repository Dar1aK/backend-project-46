import yaml from 'js-yaml';

const parseFile = (data, format) => {
  switch (format) {
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    case 'json':
      return JSON.parse(data);
    default:
      return new Error(`Format ${format} is not supported`);
  }
};

export default parseFile;
