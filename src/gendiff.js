import fs from 'fs';
import path from 'path';
import parseFile from './parsers.js';
import { generateAST, sortedByKey } from './generateAST.js';
import { formatterFn } from './formatters/index.js'

const handlePath = (filepath) => {
  if (filepath.startsWith('.') || filepath.startsWith('/')) {
    return filepath;
  }

  return `${process.cwd()}/__fixtures__/${filepath}`;
};

const parseFiles = (filepath1, filepath2) => {
  const path1 = handlePath(filepath1);
  const path2 = handlePath(filepath2);

  const data1 = parseFile(fs.readFileSync(path1, 'utf8'), path.extname(path1).slice(1));
  const data2 = parseFile(fs.readFileSync(path2, 'utf8'), path.extname(path2).slice(1));

  return { data1, data2 };
};

const getGenDiff = (filepath1, filepath2, formatter) => {
  const { data1, data2 } = parseFiles(filepath1, filepath2);
  const resultObject = generateAST(data1, data2);
  const sortedResult = sortedByKey(resultObject);

  return formatterFn(sortedResult)(formatter);
};
export default getGenDiff;
