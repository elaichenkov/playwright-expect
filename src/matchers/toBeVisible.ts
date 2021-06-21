import type { SyncExpectationResult } from 'expect/build/types';
import type { Options } from '../utils/types';

import { UIElement } from '../utils/types';
import { getErrorMessage, getElementHandle } from '../utils/utils';

/**
 * Use `toBeVisible` function when you want to check that an element is visible
 *
 * @example
 * ```typescript
 * // could be used with Promise<ElementHandle>
 * await expect(page.$('.btn')).toBeVisible(true);
 *
 * // or with ElementHandle
 * const toastElement = await page.$('.btn);
 * await expect(toastElement).toBeVisible(true);
 *
 * // or using an array of page and selector
 * await expect([page, '.btn']).toBeVisible(true);
 *
 * ```
 *
 * @param this
 * @param element
 * @param expectedState
 * @param options
 * @returns
 */
export async function toBeVisible(
  this: jest.MatcherContext,
  element: UIElement,
  expectedState = true,
  options?: Options,
): Promise<SyncExpectationResult> {
  try {
    const elementHandle = await getElementHandle(element, options?.waitForState);
    let actualState = false;

    if (elementHandle) {
      actualState = await elementHandle.isVisible();
    }

    return {
      pass: actualState === expectedState,
      message: () => getErrorMessage(this, 'toBeVisible', expectedState.toString(), actualState.toString()),
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
