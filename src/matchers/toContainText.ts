import type { SyncExpectationResult } from 'expect/build/types';
import type { Options } from '../utils/types';

import { UIElement } from '../utils/types';
import { getErrorMessage, getText, getElementHandle, formatText } from '../utils/utils';

const toContainText: jest.CustomMatcher = async function (
  element: UIElement,
  expectedText: string,
  options?: Options,
): Promise<SyncExpectationResult> {
  try {
    const elementHandle = getElementHandle(element, options?.waitForState);

    if (!elementHandle) throw new Error(`Element ${elementHandle} wasn't found`);

    let actualText = await getText(elementHandle, options?.textMethod);

    if (options?.ignoreCase) {
      actualText = formatText(actualText, { ignoreCase: true });
      expectedText = formatText(expectedText, { ignoreCase: true });
    }

    return {
      pass: actualText.includes(expectedText),
      message: () => getErrorMessage(this, 'toContainText', expectedText, actualText),
    };
  } catch (error) {
    return {
      pass: false,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      message: () => error.message,
    };
  }
};

export default toContainText;
