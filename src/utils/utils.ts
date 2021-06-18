import type { ElementHandle } from 'playwright-core';
import { DEFAULT_OPTIONS } from './constants';
import type { PageWaitForSelectorOptions, UIElement } from './types';

// eslint-disable-next-line consistent-return
export async function getElementHandle(
  element: UIElement,
  waitOptions?: PageWaitForSelectorOptions,
): Promise<ElementHandle | null> {
  // Handle PageSelector case. For instance: expect([page, selector])...
  if (Array.isArray(element)) {
    const [page, selector] = element;

    if (waitOptions) {
      const elementHandle = await page.waitForSelector(selector, {
        state: waitOptions.state ?? 'visible',
        timeout: waitOptions.timeout ?? 30000,
      });

      if (elementHandle) return elementHandle;
    }

    const elementHandle = await page.$(selector);

    if (elementHandle) return elementHandle;
    // Do nothing, just return element if it's ElementHandle. For instance: expect(await page.$('.btn'))...
  } else if (element?.constructor.name === 'ElementHandle') {
    if (waitOptions?.selector) {
      await (
        await element
      ).waitForSelector(waitOptions.selector, {
        state: waitOptions.state || 'visible',
        timeout: waitOptions.timeout || 30000,
      });
    }

    return element;
    // Do nothing too, just return element if it's Promise<ElementHandle>. For instance: expect(page.$('.btn'))...
  } else if (element instanceof Promise) {
    if (waitOptions?.selector) {
      await (
        await element
      ).waitForSelector(waitOptions.selector, {
        state: waitOptions.state || 'visible',
        timeout: waitOptions.timeout || 30000,
      });
    }

    return element;
  }

  return null;
}

export async function getValue(elementHandle: Promise<ElementHandle<Node>>): Promise<string> {
  const element = await elementHandle;
  const value = await element.evaluate((input: HTMLInputElement) => input.value);

  return value;
}

export async function getText(
  elementHandle: Promise<ElementHandle<Node>>,
  textMethod = DEFAULT_OPTIONS.textMethod,
): Promise<string> {
  const element = await elementHandle;

  if (element) return (await element[textMethod ?? 'textContent']()) ?? '';

  return '';
}

export function formatText(text: string, { ignoreCase = false, trim = false }): string {
  if (trim) {
    return text.trim();
  }
  if (ignoreCase) {
    return text.toLowerCase();
  }

  return text;
}

export const getErrorMessage = (
  { expand, isNot, promise, utils }: jest.MatcherContext,
  matcher: string,
  expected: boolean | string | number | null,
  received: boolean | string | number | null,
): string => {
  const message = isNot
    ? `Expected: not ${utils.printExpected(expected)}`
    : `${utils.printDiffOrStringify(expected, received, 'Expected', 'Received', expand)}`;

  return `${utils.matcherHint(matcher, undefined, undefined, { isNot, promise })}\n\n${message}`;
};
