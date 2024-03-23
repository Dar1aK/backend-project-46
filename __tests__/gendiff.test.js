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
  test("run with relative paths", async () => {
    expect(getGenDiff("./files/file1.json", "./files/file2.json")).toEqual(
      result
    );
  });

  test("run with absolute paths", async () => {
    expect(getGenDiff("/files/file1.json", "/files/file2.json")).toEqual(
      result
    );
  });
});
