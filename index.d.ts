import type expect from 'expect';

type Options = {
  textMethod?: 'textContent' | 'innerText';
  ignoreCase?: boolean;
  trim?: boolean;
  timeout?: number;
  state?: 'visible' | 'attached';
};

type PageWaitForUrlOptions = {
  timeout: number;
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle';
};

declare global {
  namespace PlaywrightTest {
    namespace jest {
      type Matchers<R> = PlaywrightTest.Matchers<R>;
    }
    interface Matchers<R> extends expect.Matchers<R> {
      /** Playwright default helpers */
      not: PlaywrightTest.Matchers<R>;
      resolves: PlaywrightTest.Matchers<Promise<R>>;
      rejects: PlaywrightTest.Matchers<Promise<R>>;

      /** Custom matchers */
      toHaveText(expectedText: string, options?: Options): Promise<R>;
      toContainText(expectedText: string, options?: Options): Promise<R>;
      toMatchText(expectedPattern: RegExp | string, options?: Options): Promise<R>;
      toHaveUrl(expectedUrl: RegExp | string, options?: PageWaitForUrlOptions): Promise<R>;
      toContainUrl(expectedUrl: RegExp | string, options?: PageWaitForUrlOptions): Promise<R>;
      toHaveTitle(expectedTitle: string, options?: Options): Promise<R>;
      toContainTitle(expectedTitle: string, options?: Options): Promise<R>;
      toBeFocused(expectedState?: boolean, options?: Options): Promise<R>;
      toHaveValue(expectedValue: string, options?: Options): Promise<R>;
      toContainValue(expectedValue: string, options?: Options): Promise<R>;
      toBeEnabled(expectedState?: boolean, options?: Options): Promise<R>;
      toBeChecked(expectedState?: boolean, options?: Options): Promise<R>;
      toBeDisabled(expectedState?: boolean, options?: Options): Promise<R>;
      toBeVisible(expectedState?: boolean, options?: Options): Promise<R>;
      toHaveCount(expectedCount: number): Promise<R>;

      /** Playwright default matchers */
      toMatchSnapshot(options?: { name?: string; threshold?: number }): R;
      toMatchSnapshot(name: string, options?: { threshold?: number }): R;
    }
  }
}

export const matchers;
