import path from "path";
import fs from "fs";
import yaml from "js-yaml";

const handlePath = (filepath) => {
  if (!filepath.startsWith(".")) {
    return `${process.cwd()}${filepath}`;
  }
  return filepath;
};

const parseFile = (filepath) => {
  const extension = path.extname(filepath);
  if (extension === ".yml" || extension === ".yaml") {
    return yaml.load(fs.readFileSync(filepath, "utf8"));
  }

  return JSON.parse(fs.readFileSync(path.resolve(filepath), "utf-8"));
};

const parseFiles = (filepath1, filepath2) => {
  const path1 = handlePath(filepath1);
  const path2 = handlePath(filepath2);

  const data1 = parseFile(path1);
  const data2 = parseFile(path2);

  return { data1, data2 };
};

export default parseFiles;
