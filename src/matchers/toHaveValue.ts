import type { SyncExpectationResult } from 'expect/build/types';
import type { Options } from '../utils/types';

import { UIElement } from '../utils/types';
import { getErrorMessage, getElementHandle, formatText, getValue } from '../utils/utils';

const toHaveValue: jest.CustomMatcher = async function (
  element: UIElement,
  expectedValue: string,
  options?: Options,
): Promise<SyncExpectationResult> {
  try {
    const elementHandle = getElementHandle(element, options?.waitForState);
    let actualValue = await getValue(elementHandle);

    if (options?.ignoreCase) {
      actualValue = formatText(actualValue, { ignoreCase: true });
      expectedValue = formatText(expectedValue, { ignoreCase: true });
    } else if (options?.trim) {
      actualValue = formatText(actualValue, { trim: true });
    }

    return {
      pass: actualValue === expectedValue,
      message: () => getErrorMessage(this, 'toHaveValue', expectedValue, actualValue),
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

export default toHaveValue;
