import type { ElementHandle } from 'playwright-core';
import { DEFAULT_TIMEOUT } from './constants';
import type { Options, UIElement, UIElements } from './types';

export async function getElementHandle(element: UIElement, options?: Options): Promise<ElementHandle | null> {
  if (Array.isArray(element)) {
    const [page, selector] = element;

    const elementHandle = await page.waitForSelector(selector, {
      state: options?.state ?? 'visible',
      timeout: options?.timeout ?? DEFAULT_TIMEOUT,
    });

    if (elementHandle) return elementHandle;
  } else if (element.constructor.name === 'ElementHandle') {
    return element;
  } else if (element instanceof Promise) {
    return element;
  }

  return null;
}

export async function getElements(elements: UIElements): Promise<Array<ElementHandle>> {
  let elementHandles;
  if (Array.isArray(elements) && elements[0].constructor.name === 'Page' && typeof elements[1] === 'string') {
    const [page, selector] = elements;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    elementHandles = await page.$$(selector);
  } else if (elements instanceof Promise) {
    elementHandles = await elements;

    return elementHandles;
  } else {
    elementHandles = elements;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return elementHandles;
}

export async function getValue(elementHandle: ElementHandle<Node>): Promise<string> {
  const value = await elementHandle.evaluate((input: HTMLInputElement) => input.value);

  return value;
}

export async function getText(elementHandle: ElementHandle<Node>, textMethod = 'textContent'): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (elementHandle) return elementHandle[textMethod ?? 'textContent']();

  throw new Error(`Couldn't get text from the ${elementHandle} element`);
}

export function formatText(text: string, { ignoreCase = false, trim = false }: Options): string {
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
  let message: string;

  if (isNot) {
    message = `Expected: not ${utils.printExpected(expected)}`;
  } else if (typeof expected === 'boolean') {
    message = `Expected: ${utils.printExpected(expected)} to be ${utils.printReceived(received)}`;
  } else {
    message = `${utils.printDiffOrStringify(expected, received, 'Expected', 'Received', expand)}`;
  }

  return `${utils.matcherHint(matcher, undefined, undefined, { isNot, promise })}\n\n${message}`;
};
