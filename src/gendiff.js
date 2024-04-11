import fs from 'fs';
import path from 'path';
import parseFile from './parsers.js';
import generateAST from './generateAST.js';
import { makeFormatter } from './formatters/index.js';

const handlePath = (filepath) => {
  if (filepath.startsWith('.') || filepath.startsWith('/')) {
    return filepath;
  }

  return `${process.cwd()}/__fixtures__/${filepath}`;
};

const parseFileByPath = (filepath) => {
  const filePath = handlePath(filepath);

  const data = parseFile(
    fs.readFileSync(filePath, 'utf8'),
    path.extname(filePath).slice(1),
  );

  return data;
};

const format = (filepath1, filepath2, formatName) => {
  const data1 = parseFileByPath(filepath1);
  const data2 = parseFileByPath(filepath2);
  const resultObject = generateAST(data1, data2);

  return makeFormatter(formatName, resultObject);
};
export default format;
