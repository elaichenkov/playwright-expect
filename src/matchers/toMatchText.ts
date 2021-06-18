import type { SyncExpectationResult } from 'expect/build/types';
import type { Options } from '../utils/types';

import { UIElement } from '../utils/types';
import { getErrorMessage, getText, getElementHandle } from '../utils/utils';

const toMatchText: jest.CustomMatcher = async function (
  element: UIElement,
  expectedPattern: string,
  options?: Options,
): Promise<SyncExpectationResult> {
  try {
    const elementHandle = getElementHandle(element, options?.waitForState);
    const actualText = await getText(elementHandle, options?.textMethod);

    return {
      pass: !!actualText.match(expectedPattern),
      message: () => getErrorMessage(this, 'toMatchText', expectedPattern, actualText),
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

export default toMatchText;
