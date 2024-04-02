#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs";

import getGenDiff from "../src/gendiff.js";
import { stylish, plain, json } from "../src/formatters/index.js";

const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .option("-f, --format [type]", "add the specified stylish formatter", stylish)
  .arguments("<filepath1> <filepath2>")
  .action((filepath1, filepath2, options) => {
    let formatter = stylish;
    if (options.format === "plain") {
      formatter = plain;
    } else if (options.format === "json") {
      formatter = (result) => {
        const jsonResult = json(result);

        fs.writeFileSync("./__fixtures__/test.json", jsonResult, (err) => {
          if (err) {
            return console.error(err);
          }
          return console.log(jsonResult);
        });
      };
    }
    return getGenDiff(filepath1, filepath2, formatter);
  });

program.parse(process.argv);
