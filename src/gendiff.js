import { cwd } from "node:process";

import * as path from "path";
// const path = require("path");
import fs from "fs";

export const getGenDiff = (filepath1, filepath2) => {
  let path1 = "";
  let path2 = "";
  if (!filepath1.startsWith(".")) {
    path1 = `${process.cwd()}${filepath1}`;
  } else {
    path1 = filepath1;
  }
  if (!filepath2.startsWith(".")) {
    path2 = `${process.cwd()}${filepath2}`;
  } else {
    path2 = filepath2;
  }
  const file1 = fs.readFileSync(path.resolve(path1), "utf-8");
  const file2 = fs.readFileSync(path.resolve(path2), "utf-8");
};
