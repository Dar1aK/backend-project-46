#!/usr/bin/env node

import { Command } from "commander";

import getGenDiff from "../src/gendiff.js";

const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .option("-f, --format [type]", "add the specified stylish formatter")
  .arguments("<filepath1> <filepath2>")
  .action((filepath1, filepath2, options) =>
    getGenDiff(filepath1, filepath2, options.format)
  );

program.parse(process.argv);
