import type { Page } from 'playwright-core';
import type { SyncExpectationResult } from 'expect/build/types';
import type { PageWaitForUrlOptions } from '../utils/types';

import { getErrorMessage } from '../utils/utils';

/**
 * Use `toHaveUrl` function when you want to check that page's url is equal to the expected url
 *
 * @example
 * ```typescript
 * await expect(page).toHaveUrl('https://example.com/');
 *
 * // also you can wait for the url
 * await expect(page).toHaveUrl('https://example.com/', {timeout: 5000})
 * ```
 *
 * @param this
 * @param page
 * @param expectedUrl
 * @param options
 * @returns
 */
export async function toHaveUrl(
  this: jest.MatcherContext,
  page: Page,
  expectedUrl: string,
  options?: PageWaitForUrlOptions,
): Promise<SyncExpectationResult> {
  try {
    if (options?.timeout) {
      await page.waitForURL(expectedUrl, { timeout: options.timeout });
    }

    const actualUrl = page.url();

    return {
      pass: actualUrl === expectedUrl,
      message: () => getErrorMessage(this, 'toHaveUrl', expectedUrl, actualUrl),
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
