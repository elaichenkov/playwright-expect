import type { SyncExpectationResult } from 'expect/build/types';
import type { Options } from '../utils/types';

import { UIElement } from '../utils/types';
import { getErrorMessage, getElementHandle, formatText, getValue } from '../utils/utils';

/**
 * Use `toContainValue` function when you want to check that an element's value contains the expected string or substring
 *
 * @example
 * ```typescript
 * // could be used with Promise<ElementHandle>
 * await expect(page.$('input')).toContainValue('A123');
 *
 * // or with ElementHandle
 * const toastElement = await page.$('input);
 * await expect(toastElement).toContainValue('A123');
 *
 * // or using an array of page and selector
 * await expect([page, 'input']).toContainValue('A123');
 *
 * // also you can check value ignoring case sensitive
 * await expect(page.$('input')).toContainValue('a123', {ignoreCase: true})
 * ```
 *
 * @param this
 * @param element
 * @param expectedValue
 * @param options
 * @returns
 */
export async function toContainValue(
  this: jest.MatcherContext,
  element: UIElement,
  expectedValue: string,
  options?: Options,
): Promise<SyncExpectationResult> {
  try {
    const elementHandle = await getElementHandle(element, options);
    let actualValue = await getValue(elementHandle);

    if (options?.ignoreCase) {
      actualValue = formatText(actualValue, { ignoreCase: true });
      expectedValue = formatText(expectedValue, { ignoreCase: true });
    } else if (options?.trim) {
      actualValue = formatText(actualValue, { trim: true });
    }

    return {
      pass: actualValue.includes(expectedValue),
      message: () => getErrorMessage(this, 'toContainValue', expectedValue, actualValue),
    };
  } catch (error) {
    return {
      pass: false,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      message: () => error.toString(),
    };
  }
}
