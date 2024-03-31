#!/usr/bin/env node

import { Command } from "commander";
import npm from "npm-commands";
import fs from "fs";

import getGenDiff from "../src/gendiff.js";
import stylish from "../src/formatters/stylish.js";
import plain from "../src/formatters/plain.js";

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
        const jsonResult = JSON.stringify(result);

        fs.writeFile("./__fixtures__/test.json", jsonResult, (err) => {
          if (err) {
            console.error(err);
          } else {
            return npm()
              .output(true)
              .runAsync("eslint-json ./__fixtures__/test.json")
              // .then((output) => {
              //   console.log(output, "jsonResult", jsonResult);
              // });
          }
        });
      };
    }
    return getGenDiff(filepath1, filepath2, formatter);
  });

program.parse();
