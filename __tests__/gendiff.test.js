import fs from "fs";

import getGenDiff from "../src/gendiff.js";
import stylish from "../src/stylish.js";

const result = { data: "" };

beforeAll(() => {
  const data = fs.readFileSync("./__fixtures__/result.txt", "utf-8");
  result.data = data;
});

describe("getGenDiff", () => {
  test(".json run with relative paths", async () => {
    expect(
      getGenDiff(
        "./__fixtures__/file1.json",
        "./__fixtures__/file2.json",
        stylish
      )
    ).toEqual(result.data);
  });

  test(".json run with absolute paths", async () => {
    expect(
      getGenDiff(
        "/__fixtures__/file1.json",
        "/__fixtures__/file2.json",
        stylish
      )
    ).toEqual(result.data);
  });

  test(".yml run with relative paths", async () => {
    expect(
      getGenDiff(
        "./__fixtures__/file1.yml",
        "./__fixtures__/file2.yml",
        stylish
      )
    ).toEqual(result.data);
  });

  test(".yml run with absolute paths", async () => {
    expect(
      getGenDiff("/__fixtures__/file1.yml", "/__fixtures__/file2.yml", stylish)
    ).toEqual(result.data);
  });

  test(".yaml run with relative paths", async () => {
    expect(
      getGenDiff(
        "./__fixtures__/file1.yaml",
        "./__fixtures__/file2.yaml",
        stylish
      )
    ).toEqual(result.data);
  });

  test(".yaml run with absolute paths", async () => {
    expect(
      getGenDiff(
        "/__fixtures__/file1.yaml",
        "/__fixtures__/file2.yaml",
        stylish
      )
    ).toEqual(result.data);
  });
});
