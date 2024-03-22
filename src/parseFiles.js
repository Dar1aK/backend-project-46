import path from "path";
import fs from "fs";

const parseFile = (filepath) => {
  if (!filepath.startsWith(".")) {
    return `${process.cwd()}${filepath}`;
  }
  return filepath;
};

const parseFiles = (filepath1, filepath2) => {
  const path1 = parseFile(filepath1);
  const path2 = parseFile(filepath2);

  const data1 = JSON.parse(fs.readFileSync(path.resolve(path1), "utf-8"));
  const data2 = JSON.parse(fs.readFileSync(path.resolve(path2), "utf-8"));

  return { data1, data2 };
};

export default parseFiles;
