import type { SyncExpectationResult } from 'expect/build/types';
import type { Options } from '../utils/types';

import { UIElement } from '../utils/types';
import { getErrorMessage, getText, getElementHandle, formatText } from '../utils/utils';

/**
 * Use `toContainText` function when you want to check that an element's text contains the expected string or substring
 *
 * @example
 * ```typescript
 * // could be used with Promise<ElementHandle>
 * await expect(page.$('.alert')).toContainText('Success');
 *
 * // or with ElementHandle
 * const toastElement = await page.$('.alert);
 * await expect(toastElement).toContainText('Success');
 *
 * // or using an array of page and selector
 * await expect([page, '.alert']).toHaveText('Success');
 *
 * // also you can check text ignoring case sensitive
 * await expect(page.$('.alert')).toHaveText('success', {ignoreCase: true})
 * ```
 *
 * @param this
 * @param element
 * @param expectedText
 * @param options
 * @returns
 */
export async function toContainText(
  this: jest.MatcherContext,
  element: UIElement,
  expectedText: string,
  options?: Options,
): Promise<SyncExpectationResult> {
  try {
    const elementHandle = getElementHandle(element, options?.waitForState);

    if (!elementHandle) throw new Error(`Element ${elementHandle} wasn't found`);

    let actualText = await getText(elementHandle, options?.textMethod);

    if (options?.ignoreCase) {
      actualText = formatText(actualText, { ignoreCase: true });
      expectedText = formatText(expectedText, { ignoreCase: true });
    }

    return {
      pass: actualText.includes(expectedText),
      message: () => getErrorMessage(this, 'toContainText', expectedText, actualText),
    };
  } catch (error) {
    return {
      pass: false,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      message: () => error.message,
    };
  }
}
