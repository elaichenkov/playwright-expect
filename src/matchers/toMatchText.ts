import type { SyncExpectationResult } from 'expect/build/types';
import type { Options } from '../utils/types';

import { UIElement } from '../utils/types';
import { getErrorMessage, getText, getElementHandle } from '../utils/utils';

/**
 * Use `toMatchText` function when you want to check that an element's text matches the expected text with regular expression
 *
 * @example
 * ```typescript
 * // could be used with Promise<ElementHandle>
 * await expect(page.$('.alert')).toMatchText(/[S|s]uccess/);
 *
 * // or with ElementHandle
 * const toastElement = await page.$('.alert);
 * await expect(toastElement).toMatchText(/[S|s]uccess/);
 *
 * // or using selector with page
 * await expect([page, '.alert']).toMatchText(/[S|s]uccess/);
 * ```
 *
 * @param this
 * @param element
 * @param expectedPattern
 * @param options
 * @returns
 */
export async function toMatchText(
  this: jest.MatcherContext,
  element: UIElement,
  expectedPattern: string,
  options?: Options,
): Promise<SyncExpectationResult> {
  try {
    const elementHandle = getElementHandle(element, options?.waitForState);
    const actualText = await getText(elementHandle, options?.textMethod);

    return {
      pass: !!actualText.match(expectedPattern),
      message: () => getErrorMessage(this, 'toMatchText', expectedPattern, actualText),
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
