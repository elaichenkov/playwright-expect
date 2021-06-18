import type { SyncExpectationResult } from 'expect/build/types';
import type { Options } from '../utils/types';

import { UIElement } from '../utils/types';
import { getErrorMessage, getElementHandle } from '../utils/utils';

const toBeVisible: jest.CustomMatcher = async function (
  element: UIElement,
  expectedState: boolean,
  options?: Options,
): Promise<SyncExpectationResult> {
  try {
    const elementHandle = await getElementHandle(element, options?.waitForState);
    let actualState = false;

    if (elementHandle) {
      actualState = await elementHandle.isVisible();
    }

    return {
      pass: actualState === expectedState,
      message: () => getErrorMessage(this, 'toBeVisible', expectedState.toString(), actualState.toString()),
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

export default toBeVisible;
