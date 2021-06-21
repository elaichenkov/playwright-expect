import type { SyncExpectationResult } from 'expect/build/types';
import { UIElements } from '../utils/types';

import { getElements, getErrorMessage } from '../utils/utils';

/**
 * Use `toHaveCount` function when you want to check that an elements length is equal to the expected length
 *
 * @example
 * ```typescript
 * // could be used with Promise<Array<ElementHandle>>
 * await expect(page.$$('img')).toHaveCount(3);
 *
 * // or with Array<ElementHandle>
 * const images = await page.$$('img');
 * await expect(toastElement).toHaveCount(3);
 *
 * // or using selector with page
 * await expect([page, 'img']).toHaveCount(3);
 * ```
 *
 * @param this
 * @param elements
 * @param expectedCount
 * @param options
 * @returns
 */
export async function toHaveCount(
  this: jest.MatcherContext,
  elements: UIElements,
  expectedCount: number,
): Promise<SyncExpectationResult> {
  try {
    const elementHandles = await getElements(elements);
    const actualCount = elementHandles.length;

    return {
      pass: actualCount === expectedCount,
      message: () => getErrorMessage(this, 'toHaveCount', expectedCount, actualCount),
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
