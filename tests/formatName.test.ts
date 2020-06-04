import { formatName } from '../src/formatName';

describe('formatInputName', () => {
  it('should format input name with string', () => {
    expect(formatName('test')).toBe('test');
  });

  it('should format input name with array', () => {
    expect(formatName(['test1', 'test2'])).toBe('test1.test2');
    expect(formatName(['test1', 'test2', 'test3'])).toBe('test1.test2.test3');
    expect(formatName(['test1', 0, 'test2'])).toBe('test1[0].test2');
    expect(formatName(['test1', 0, 'test2', 1, 'test3'])).toBe(
      'test1[0].test2[1].test3',
    );
    expect(formatName(['test1', 'test2', 0, 'test3'])).toBe(
      'test1.test2[0].test3',
    );
    expect(formatName(['test1', '0', 'test2'])).toBe('test1.0.test2');
    expect(formatName(['test1', '0', 'test2', 1, 'test3'])).toBe(
      'test1.0.test2[1].test3',
    );
  });
});
