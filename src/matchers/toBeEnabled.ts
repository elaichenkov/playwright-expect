import type { SyncExpectationResult } from 'expect/build/types';
import type { Options } from '../utils/types';

import { UIElement } from '../utils/types';
import { getErrorMessage, getElementHandle } from '../utils/utils';

/**
 * Use `toBeEnabled` function when you want to check that an element is enabled
 *
 * @example
 * ```typescript
 * // could be used with Promise<ElementHandle>
 * await expect(page.$('.btn')).toBeEnabled(true);
 *
 * // or with ElementHandle
 * const toastElement = await page.$('.btn);
 * await expect(toastElement).toBeEnabled(true);
 *
 * // or using an array of page and selector
 * await expect([page, '.btn']).toBeEnabled(true);
 *
 * ```
 *
 * @param this
 * @param element
 * @param expectedState
 * @param options
 * @returns
 */
export async function toBeEnabled(
  this: jest.MatcherContext,
  element: UIElement,
  expectedState: boolean,
  options?: Options,
): Promise<SyncExpectationResult> {
  try {
    const elementHandle = await getElementHandle(element, options?.waitForState);
    const actualState = await elementHandle.isEnabled();

    return {
      pass: actualState === expectedState,
      message: () => getErrorMessage(this, 'toBeEnabled', expectedState.toString(), actualState.toString()),
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
