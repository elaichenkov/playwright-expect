import type { SyncExpectationResult } from 'expect/build/types';
import type { Options } from '../utils/types';

import { UIElement } from '../utils/types';
import { getErrorMessage, getText, getElementHandle, formatText } from '../utils/utils';

/**
 * Use `toHaveText` function when you want to check that an element's text is equal to the expected text
 *
 * @example
 * ```typescript
 * // could be used with Promise<ElementHandle>
 * await expect(page.$('.alert')).toHaveText('Success message');
 *
 * // or with ElementHandle
 * const toastElement = await page.$('.alert);
 * await expect(toastElement).toHaveText('Success message');
 *
 * // or using selector with page
 * await expect([page, '.alert']).toHaveText('Success message');
 *
 * // also you can check text ignoring case sensitive
 * await expect(page.$('.alert')).toHaveText('success message', {ignoreCase: true})
 * ```
 *
 * @param this
 * @param element
 * @param expectedText
 * @param options
 * @returns
 */
export async function toHaveText(
  this: jest.MatcherContext,
  element: UIElement,
  expectedText: string,
  options?: Options,
): Promise<SyncExpectationResult> {
  try {
    const elementHandle = getElementHandle(element, options?.waitForState);
    let actualText = await getText(elementHandle, options?.textMethod);

    if (options?.ignoreCase) {
      actualText = formatText(actualText, { ignoreCase: true });
      expectedText = formatText(expectedText, { ignoreCase: true });
    } else if (options?.trim) {
      actualText = formatText(actualText, { trim: true });
    }

    return {
      pass: actualText === expectedText,
      message: () => getErrorMessage(this, 'toHaveText', expectedText, actualText),
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
