import type { Page } from 'playwright-core';
import type { SyncExpectationResult } from 'expect/build/types';
import type { Options } from '../utils/types';

import { getErrorMessage } from '../utils/utils';

const toHaveUrl: jest.CustomMatcher = async function (
  page: Page,
  expectedUrl: string,
  options?: Options,
): Promise<SyncExpectationResult> {
  try {
    if (options?.waitForUrl) {
      await page.waitForURL(expectedUrl, options.waitForUrl.options);
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
};

export default toHaveUrl;
