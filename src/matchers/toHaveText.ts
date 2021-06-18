import type { SyncExpectationResult } from 'expect/build/types';
import type { Options } from '../utils/types';

import { UIElement } from '../utils/types';
import { getErrorMessage, getText, getElementHandle, formatText } from '../utils/utils';

const toHaveText: jest.CustomMatcher = async function (
  element: UIElement,
  expectedText: string,
  options?: Options,
): Promise<SyncExpectationResult> {
  try {
    const elementHandle = getElementHandle(element, options?.waitForState);
    let actualText = await getText(elementHandle, options?.textMethod);

    if (options?.ignoreCase) {
      actualText = formatText(actualText, { ignoreCase: true });
      expectedText = formatText(expectedText, { ignoreCase: true });
    } else if (options?.trim) {
      actualText = formatText(actualText, { trim: true });
    }

    return {
      pass: actualText === expectedText,
      message: () => getErrorMessage(this, 'toHaveText', expectedText, actualText),
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

export default toHaveText;
