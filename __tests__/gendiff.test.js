import fs from 'fs';

import getGenDiff from '../src/gendiff.js';

const result = { data: '', plain: '', json: '' };

beforeAll(() => {
  const data = fs.readFileSync('./__fixtures__/stylish.txt', 'utf-8');
  const plainData = fs.readFileSync('./__fixtures__/plain.txt', 'utf-8');
  const jsonData = fs.readFileSync('./__fixtures__/json.txt', 'utf-8');

  result.data = data;
  result.plain = plainData;
  result.json = jsonData;
});

describe('getGenDiff', () => {
  test('run stylish by default formatter with .yaml', async () => {
    expect(getGenDiff('file1.yaml', 'file2.yaml')).toEqual(result.data);
  });

  test('run stylish formatter with .json with relative paths', async () => {
    expect(
      getGenDiff(
        './__fixtures__/file1.json',
        './__fixtures__/file2.json',
        'stylish',
      ),
    ).toEqual(result.data);
  });

  test('run stylish formatter with .json without paths', async () => {
    expect(getGenDiff('file1.json', 'file2.json', 'stylish')).toEqual(
      result.data,
    );
  });

  test('run stylish formatter with .yml with relative paths', async () => {
    expect(
      getGenDiff(
        './__fixtures__/file1.yml',
        './__fixtures__/file2.yml',
        'stylish',
      ),
    ).toEqual(result.data);
  });

  test('run stylish formatter with .yml without paths', async () => {
    expect(getGenDiff('file1.yml', 'file2.yml', 'stylish')).toEqual(
      result.data,
    );
  });

  test('run stylish formatter with .yaml with relative paths', async () => {
    expect(
      getGenDiff(
        './__fixtures__/file1.yaml',
        './__fixtures__/file2.yaml',
        'stylish',
      ),
    ).toEqual(result.data);
  });

  test('run stylish formatter with .yaml without paths', async () => {
    expect(getGenDiff('file1.yaml', 'file2.yaml', 'stylish')).toEqual(
      result.data,
    );
  });

  test('run plain formatter with .yaml without paths', async () => {
    expect(getGenDiff('file1.yaml', 'file2.yaml', 'plain')).toEqual(
      result.plain,
    );
  });

  test('run plain formatter with .yml with relative paths', async () => {
    expect(
      getGenDiff(
        './__fixtures__/file1.yml',
        './__fixtures__/file2.yml',
        'plain',
      ),
    ).toEqual(result.plain);
  });

  test('run plain formatter with .json with relative paths', async () => {
    expect(
      getGenDiff(
        './__fixtures__/file1.json',
        './__fixtures__/file2.json',
        'plain',
      ),
    ).toEqual(result.plain);
  });

  test('run json formatter with .json without paths', async () => {
    expect(getGenDiff('file1.json', 'file2.json', 'json')).toEqual(result.json);
  });

  test('run json formatter with .yml with relative paths', async () => {
    expect(
      getGenDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml', 'json'),
    ).toEqual(result.json);
  });

  test('run json formatter with .yaml with relative paths', async () => {
    expect(
      getGenDiff(
        './__fixtures__/file1.yaml',
        './__fixtures__/file2.yaml',
        'json',
      ),
    ).toEqual(result.json);
  });
});
