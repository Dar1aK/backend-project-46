import getGenDiff from "../src/gendiff.js";

test("getGenDiff", () => {
  expect(getGenDiff("./files/file1.json", "./files/file2.json")).toEqual({
    "- follow": false,
    host: "hexlet.io",
    "- proxy": "123.234.53.22",
    "- timeout": 50,
    "+ timeout": 20,
    "+ verbose": true,
  });

  expect(getGenDiff("/files/file1.json", "/files/file2.json")).toEqual({
    "- follow": false,
    host: "hexlet.io",
    "- proxy": "123.234.53.22",
    "- timeout": 50,
    "+ timeout": 20,
    "+ verbose": true,
  });
});
