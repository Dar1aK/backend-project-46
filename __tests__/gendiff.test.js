import fs from 'fs';

import format from '../src/gendiff.js';

const data = fs.readFileSync('./__fixtures__/stylish.txt', 'utf-8');
const plainData = fs.readFileSync('./__fixtures__/plain.txt', 'utf-8');
const jsonData = fs.readFileSync('./__fixtures__/json.txt', 'utf-8');

describe('format', () => {
  test('run stylish by default formatter with .yaml', () => {
    expect(format('file1.yaml', 'file2.yaml')).toEqual(data);
  });

  test('run stylish formatter with .json with relative paths', () => {
    expect(
      format(
        './__fixtures__/file1.json',
        './__fixtures__/file2.json',
        'stylish',
      ),
    ).toEqual(data);
  });

  test('run stylish formatter with .json without paths', () => {
    expect(format('file1.json', 'file2.json', 'stylish')).toEqual(
      data,
    );
  });

  test('run stylish formatter with .yml with relative paths', () => {
    expect(
      format(
        './__fixtures__/file1.yml',
        './__fixtures__/file2.yml',
        'stylish',
      ),
    ).toEqual(data);
  });

  test('run stylish formatter with .yml without paths', () => {
    expect(format('file1.yml', 'file2.yml', 'stylish')).toEqual(
      data,
    );
  });

  test('run stylish formatter with .yaml with relative paths', () => {
    expect(
      format(
        './__fixtures__/file1.yaml',
        './__fixtures__/file2.yaml',
        'stylish',
      ),
    ).toEqual(data);
  });

  test('run stylish formatter with .yaml without paths', () => {
    expect(format('file1.yaml', 'file2.yaml', 'stylish')).toEqual(
      data,
    );
  });

  test('run plain formatter with .yaml without paths', () => {
    expect(format('file1.yaml', 'file2.yaml', 'plain')).toEqual(
      plainData,
    );
  });

  test('run plain formatter with .yml with relative paths', () => {
    expect(
      format(
        './__fixtures__/file1.yml',
        './__fixtures__/file2.yml',
        'plain',
      ),
    ).toEqual(plainData);
  });

  test('run plain formatter with .json with relative paths', () => {
    expect(
      format(
        './__fixtures__/file1.json',
        './__fixtures__/file2.json',
        'plain',
      ),
    ).toEqual(plainData);
  });

  test('run json formatter with .json without paths', () => {
    expect(format('file1.json', 'file2.json', 'json')).toEqual(jsonData);
  });

  test('run json formatter with .yml with relative paths', () => {
    expect(
      format('./__fixtures__/file1.yml', './__fixtures__/file2.yml', 'json'),
    ).toEqual(jsonData);
  });

  test('run json formatter with .yaml with relative paths', () => {
    expect(
      format(
        './__fixtures__/file1.yaml',
        './__fixtures__/file2.yaml',
        'json',
      ),
    ).toEqual(jsonData);
  });
});
