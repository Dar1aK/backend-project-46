import fs from "fs";

import getGenDiff from "../src/gendiff.js";
import { plain, stylish } from "../src/formatters";

const result = { data: "", plain: "", json: "" };

beforeAll(() => {
  const data = fs.readFileSync("./__fixtures__/stylish.txt", "utf-8");
  const plainData = fs.readFileSync("./__fixtures__/plain.txt", "utf-8");
  const json = fs.readFileSync("./__fixtures__/json.txt", "utf-8");

  result.data = data;
  result.plain = plainData;
  result.json = json;
});

describe("getGenDiff", () => {
  test("run stylish formatter with .json with relative paths", async () => {
    expect(
      getGenDiff(
        "./__fixtures__/file1.json",
        "./__fixtures__/file2.json",
        stylish
      )
    ).toEqual(result.data);
  });

  test("run stylish formatter with .json with absolute paths", async () => {
    expect(
      getGenDiff(
        "/__fixtures__/file1.json",
        "/__fixtures__/file2.json",
        stylish
      )
    ).toEqual(result.data);
  });

  test("run stylish formatter with .yml with relative paths", async () => {
    expect(
      getGenDiff(
        "./__fixtures__/file1.yml",
        "./__fixtures__/file2.yml",
        stylish
      )
    ).toEqual(result.data);
  });

  test("run stylish formatter with .yml with absolute paths", async () => {
    expect(
      getGenDiff("/__fixtures__/file1.yml", "/__fixtures__/file2.yml", stylish)
    ).toEqual(result.data);
  });

  test("run stylish formatter with .yaml with relative paths", async () => {
    expect(
      getGenDiff(
        "./__fixtures__/file1.yaml",
        "./__fixtures__/file2.yaml",
        stylish
      )
    ).toEqual(result.data);
  });

  test("run stylish formatter with .yaml with absolute paths", async () => {
    expect(
      getGenDiff(
        "/__fixtures__/file1.yaml",
        "/__fixtures__/file2.yaml",
        stylish
      )
    ).toEqual(result.data);
  });

  test("run plain formatter with .yaml with absolute paths", async () => {
    expect(
      getGenDiff("/__fixtures__/file1.yaml", "/__fixtures__/file2.yaml", plain)
    ).toEqual(result.plain);
  });

  test("run plain formatter with .yml with relative paths", async () => {
    expect(
      getGenDiff("./__fixtures__/file1.yml", "./__fixtures__/file2.yml", plain)
    ).toEqual(result.plain);
  });

  test("run plain formatter with .json with relative paths", async () => {
    expect(
      getGenDiff(
        "./__fixtures__/file1.json",
        "./__fixtures__/file2.json",
        plain
      )
    ).toEqual(result.plain);
  });

  test("run json formatter with .json with relative paths", async () => {
    expect(
      getGenDiff(
        "./__fixtures__/file1.json",
        "./__fixtures__/file2.json",
        (res) => JSON.stringify(res)
      )
    ).toEqual(result.json);
  });

  test("run json formatter with .yml with relative paths", async () => {
    expect(
      getGenDiff(
        "./__fixtures__/file1.yml",
        "./__fixtures__/file2.yml",
        (res) => JSON.stringify(res)
      )
    ).toEqual(result.json);
  });

  test("run json formatter with .yaml with relative paths", async () => {
    expect(
      getGenDiff(
        "./__fixtures__/file1.yaml",
        "./__fixtures__/file2.yaml",
        (res) => JSON.stringify(res)
      )
    ).toEqual(result.json);
  });
});
