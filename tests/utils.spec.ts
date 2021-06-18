import { formatText } from '../src/utils/utils';

describe('UTILS', () => {
  test('verify formatText function with ignoreCase property', () => {
    const text = 'Hello';
    const expected = 'hello';
    const actual = formatText(text, { ignoreCase: true });

    expect(actual).toBe(expected);
  });

  test('verify formatText function with ignoreCase property negative', () => {
    const text = 'Hello';
    const expected = 'Hello';
    const actual = formatText(text, { ignoreCase: false });

    expect(actual).toBe(expected);
  });

  test('verify formatText function with trim property', () => {
    const text = ' Hello ';
    const expected = 'Hello';
    const actual = formatText(text, { trim: true });

    expect(actual).toBe(expected);
  });

  test('verify formatText function with trim property negative', () => {
    const text = ' Hello';
    const expected = ' Hello';
    const actual = formatText(text, { trim: false });

    expect(actual).toBe(expected);
  });
});
