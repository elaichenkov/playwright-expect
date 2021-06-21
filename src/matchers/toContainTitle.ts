import type { Page } from 'playwright-core';
import type { SyncExpectationResult } from 'expect/build/types';
import type { Options } from '../utils/types';

import { formatText, getErrorMessage } from '../utils/utils';

/**
 * Use `toContainTitle` function when you want to check that page's title contains the expected title
 *
 * @example
 * ```typescript
 * await expect(page).toContainTitle('Doc');
 *
 * // also you can check text ignoring case sensitive
 * await expect(page).toContainTitle('doc', {ignoreCase: true})
 * ```
 *
 * @param this
 * @param page
 * @param expectedTitle
 * @param options
 * @returns
 */
export async function toContainTitle(
  this: jest.MatcherContext,
  page: Page,
  expectedTitle: string,
  options?: Options,
): Promise<SyncExpectationResult> {
  try {
    let actualTitle = await page.title();

    if (options?.ignoreCase) {
      actualTitle = formatText(actualTitle, { ignoreCase: true });
      expectedTitle = formatText(expectedTitle, { ignoreCase: true });
    } else if (options?.trim) {
      actualTitle = formatText(actualTitle, { trim: true });
    }

    return {
      pass: actualTitle.includes(expectedTitle),
      message: () => getErrorMessage(this, 'toContainTitle', expectedTitle, actualTitle),
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
