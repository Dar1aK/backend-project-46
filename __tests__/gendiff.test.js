import { test, expect, jest } from "@jest/globals";

import getGenDiff from "../src/gendiff.js";

jest.useFakeTimers();

describe("getGenDiff", () => {
  test("run with relative paths", async () => {
    jest.useFakeTimers({ timerLimit: 5000 });

    expect(getGenDiff("./files/file1.json", "./files/file2.json")).toEqual({
      "- follow": false,
      host: "hexlet.io",
      "- proxy": "123.234.53.22",
      "- timeout": 50,
      "+ timeout": 20,
      "+ verbose": true,
    });
  });

  test("run with absolute paths", async () => {
    jest.useFakeTimers({ timerLimit: 5000 });

    expect(getGenDiff("/files/file1.json", "/files/file2.json")).toEqual({
      "- follow": false,
      host: "hexlet.io",
      "- proxy": "123.234.53.22",
      "- timeout": 50,
      "+ timeout": 20,
      "+ verbose": true,
    });
  });
});
