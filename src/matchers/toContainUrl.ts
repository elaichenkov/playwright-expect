import type { Page } from 'playwright-core';
import type { SyncExpectationResult } from 'expect/build/types';
import type { PageWaitForUrlOptions } from '../utils/types';

import { getErrorMessage } from '../utils/utils';

/**
 * Use `toContainUrl` function when you want to check that page's url contains the expected url
 *
 * @example
 * ```typescript
 * await expect(page).toContainUrl('example');
 *
 * // also you can wait for the url
 * await expect(page).toContainUrl('example', {timeout: 5000})
 * ```
 *
 * @param this
 * @param page
 * @param expectedUrl
 * @param options
 * @returns
 */
export async function toContainUrl(
  this: jest.MatcherContext,
  page: Page,
  expectedUrl: string,
  options?: PageWaitForUrlOptions,
): Promise<SyncExpectationResult> {
  try {
    if (options?.timeout) {
      await page.waitForURL(new RegExp(`${expectedUrl}`), { timeout: options.timeout });
    }

    const actualUrl = page.url();

    return {
      pass: actualUrl.includes(expectedUrl),
      message: () => getErrorMessage(this, 'toContainUrl', expectedUrl, actualUrl),
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
