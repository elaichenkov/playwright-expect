import type { SyncExpectationResult } from 'expect/build/types';
import type { Options } from '../utils/types';

import { UIElement } from '../utils/types';
import { getErrorMessage, getElementHandle, formatText, getValue } from '../utils/utils';

/**
 * Use `toHaveValue` function when you want to check that an element's value is equal to the expected value
 *
 * @example
 * ```typescript
 * // could be used with Promise<ElementHandle>
 * await expect(page.$('input')).toHaveValue('user');
 *
 * // or with ElementHandle
 * const toastElement = await page.$('input);
 * await expect(toastElement).toHaveValue('user');
 *
 * // or using selector with page
 * await expect([page, 'input']).toHaveValue('user');
 *
 * // also you can check value ignoring case sensitive
 * await expect(page.$('input')).toHaveValue('USER', {ignoreCase: true})
 * ```
 *
 * @param this
 * @param element
 * @param expectedValue
 * @param options
 * @returns
 */
export async function toHaveValue(
  this: jest.MatcherContext,
  element: UIElement,
  expectedValue: string,
  options?: Options,
): Promise<SyncExpectationResult> {
  try {
    const elementHandle = getElementHandle(element, options?.waitForState);
    let actualValue = await getValue(elementHandle);

    if (options?.ignoreCase) {
      actualValue = formatText(actualValue, { ignoreCase: true });
      expectedValue = formatText(expectedValue, { ignoreCase: true });
    } else if (options?.trim) {
      actualValue = formatText(actualValue, { trim: true });
    }

    return {
      pass: actualValue === expectedValue,
      message: () => getErrorMessage(this, 'toHaveValue', expectedValue, actualValue),
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
