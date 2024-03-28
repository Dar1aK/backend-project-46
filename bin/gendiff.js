#!/usr/bin/env node

import { Command } from "commander";
import getGenDiff from "../src/gendiff.js";
import stylish from "../src/formatters/stylish.js";
import plain from "../src/formatters/plain.js";

const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .option("-f, --format [type]", "output format")
  .option(
    "-ft, --formatter [type]",
    "add the specified stylish formatter",
    stylish
  )
  .arguments("<filepath1> <filepath2>")
  .action((filepath1, filepath2, options) => {
    let formatter = stylish;
    if (options.formatter === "plain") {
      formatter = plain;
    }
    return getGenDiff(filepath1, filepath2, formatter);
  });

program.parse();
