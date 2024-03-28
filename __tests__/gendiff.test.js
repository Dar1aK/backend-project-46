import fs from "fs";

import getGenDiff from "../src/gendiff.js";
import { plain, stylish } from "../src/formatters";

const result = { data: "", plain: "" };

beforeAll(() => {
  const data = fs.readFileSync("./__fixtures__/result.txt", "utf-8");
  const plainData = fs.readFileSync("./__fixtures__/plain.txt", "utf-8");

  result.data = data;
  result.plain = plainData;
});

describe("getGenDiff", () => {
  test("run .json with relative paths", async () => {
    expect(
      getGenDiff(
        "./__fixtures__/file1.json",
        "./__fixtures__/file2.json",
        stylish
      )
    ).toEqual(result.data);
  });

  test("run .json with absolute paths", async () => {
    expect(
      getGenDiff(
        "/__fixtures__/file1.json",
        "/__fixtures__/file2.json",
        stylish
      )
    ).toEqual(result.data);
  });

  test("run .yml with relative paths", async () => {
    expect(
      getGenDiff(
        "./__fixtures__/file1.yml",
        "./__fixtures__/file2.yml",
        stylish
      )
    ).toEqual(result.data);
  });

  test("run .yml with absolute paths", async () => {
    expect(
      getGenDiff("/__fixtures__/file1.yml", "/__fixtures__/file2.yml", stylish)
    ).toEqual(result.data);
  });

  test("run .yaml with relative paths", async () => {
    expect(
      getGenDiff(
        "./__fixtures__/file1.yaml",
        "./__fixtures__/file2.yaml",
        stylish
      )
    ).toEqual(result.data);
  });

  test("run .yaml with absolute paths", async () => {
    expect(
      getGenDiff(
        "/__fixtures__/file1.yaml",
        "/__fixtures__/file2.yaml",
        stylish
      )
    ).toEqual(result.data);
  });

  test("run .yaml with absolute paths", async () => {
    expect(
      getGenDiff("/__fixtures__/file1.yaml", "/__fixtures__/file2.yaml", plain)
    ).toEqual(result.plain);
  });

  test("run .yml with relative paths", async () => {
    expect(
      getGenDiff("./__fixtures__/file1.yml", "./__fixtures__/file2.yml", plain)
    ).toEqual(result.plain);
  });

  test("run .json with relative paths", async () => {
    expect(
      getGenDiff(
        "./__fixtures__/file1.json",
        "./__fixtures__/file2.json",
        plain
      )
    ).toEqual(result.plain);
  });
});
