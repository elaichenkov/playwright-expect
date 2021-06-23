import type { SyncExpectationResult } from 'expect/build/types';
import type { Options } from '../utils/types';

import { UIElement } from '../utils/types';
import { getErrorMessage, getElementHandle } from '../utils/utils';

/**
 * Use `toBeChecked` function when you want to check that an element is enabled
 *
 * @example
 * ```typescript
 * // could be used with Promise<ElementHandle>
 * await expect(page.$('.btn')).toBeChecked();
 *
 * // or with ElementHandle
 * const toastElement = await page.$('.btn);
 * await expect(toastElement).toBeChecked();
 *
 * // or using an array of page and selector
 * await expect([page, '.btn']).toBeChecked(true);
 *
 * ```
 *
 * @param this
 * @param element
 * @param expectedState
 * @param options
 * @returns
 */
export async function toBeChecked(
  this: jest.MatcherContext,
  element: UIElement,
  expectedState = true,
  options?: Options,
): Promise<SyncExpectationResult> {
  try {
    const elementHandle = await getElementHandle(element, options);
    const actualState = await elementHandle.isChecked();

    return {
      pass: actualState === expectedState,
      message: () => getErrorMessage(this, 'toBeChecked', expectedState, actualState),
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
