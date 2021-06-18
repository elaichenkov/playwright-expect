import type { Page } from 'playwright-core';
import type { SyncExpectationResult } from 'expect/build/types';
import type { Options } from '../utils/types';

import { formatText, getErrorMessage } from '../utils/utils';

const toHaveTitle: jest.CustomMatcher = async function (
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
      pass: actualTitle === expectedTitle,
      message: () => getErrorMessage(this, 'toHaveTitle', expectedTitle, actualTitle),
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

export default toHaveTitle;
