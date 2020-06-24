import { formatName } from './formatName';

describe('formatName', () => {
  const tests: [string, string | [string, ...(string | number)[]], string][] = [
    ['should format correctly when name is string', 'test', 'test'],
    [
      'should combine array to string like object if name is array when contain one item',
      ['test1'],
      'test1',
    ],
    [
      'should combine array to string like object if name is array',
      ['test1', 'test2', 'test3'],
      'test1.test2.test3',
    ],
    [
      'should combine array to string like array that contain object, if name is array when contain one item',
      ['test1', 0],
      'test1[0]',
    ],
    [
      'should combine array to string like array that contain object, if name is array',
      ['test1', 0, 'test2', 1, 'test3'],
      'test1[0].test2[1].test3',
    ],
  ];

  test.each(tests)('%s', (_, input, result) => {
    expect(formatName(input)).toBe(result);
  });
});
