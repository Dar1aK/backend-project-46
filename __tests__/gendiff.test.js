import getGenDiff from "../src/gendiff.js";

const result = {
  "- follow": false,
  host: "hexlet.io",
  "- proxy": "123.234.53.22",
  "- timeout": 50,
  "+ timeout": 20,
  "+ verbose": true,
};

describe("getGenDiff", () => {
  test(".json run with relative paths", async () => {
    expect(
      getGenDiff("./__fixtures__/file1.json", "./__fixtures__/file2.json")
    ).toEqual(result);
  });

  test(".json run with absolute paths", async () => {
    expect(
      getGenDiff("/__fixtures__/file1.json", "/__fixtures__/file2.json")
    ).toEqual(result);
  });

  test(".yml run with relative paths", async () => {
    expect(
      getGenDiff("./__fixtures__/file1.yml", "./__fixtures__/file2.yml")
    ).toEqual(result);
  });

  test(".yml run with absolute paths", async () => {
    expect(
      getGenDiff("/__fixtures__/file1.yml", "/__fixtures__/file2.yml")
    ).toEqual(result);
  });

  test(".yaml run with relative paths", async () => {
    expect(
      getGenDiff("./__fixtures__/file1.yaml", "./__fixtures__/file2.yaml")
    ).toEqual(result);
  });

  test(".yaml run with absolute paths", async () => {
    expect(
      getGenDiff("/__fixtures__/file1.yaml", "/__fixtures__/file2.yaml")
    ).toEqual(result);
  });
});
