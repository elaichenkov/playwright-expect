interface PageWaitForSelectorOptions {
  selector?: string;
  state?: 'attached' | 'detached' | 'visible' | 'hidden';
  timeout?: number;
}

type Options = {
  textMethod?: 'textContent' | 'innerText';
  ignoreCase?: boolean;
  trim?: boolean;
  waitForState?: PageWaitForSelectorOptions;
};

type PageWaitForUrlOptions = {
  timeout: number;
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle';
};

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> extends expect.Matchers<R> {
      /**
       * If you know how to test something, `.not` lets you test its opposite.
       */
      not: PlaywrightTest.Matchers<R>;
      /**
       * Use resolves to unwrap the value of a fulfilled promise so any other
       * matcher can be chained. If the promise is rejected the assertion fails.
       */
      resolves: PlaywrightTest.Matchers<Promise<R>>;
      /**
       * Unwraps the reason of a rejected promise so any other matcher can be chained.
       * If the promise is fulfilled the assertion fails.
       */
      rejects: PlaywrightTest.Matchers<Promise<R>>;

      //* Custom matchers */
      toHaveText(expectedText: string, options?: Options): Promise<R>;
      toContainText(expectedText: string, options?: Options): Promise<R>;
      toMatchText(expectedPattern: RegExp | string, options?: Options): Promise<R>;
      toHaveUrl(expectedUrl: RegExp | string, options?: PageWaitForUrlOptions): Promise<R>;
      toContainUrl(expectedUrl: RegExp | string, options?: PageWaitForUrlOptions): Promise<R>;
      toHaveTitle(expectedTitle: string, options?: Options): Promise<R>;
      toContainTitle(expectedTitle: string, options?: Options): Promise<R>;
      toBeFocused(expectedState: boolean, options?: Options): Promise<R>;
      toHaveValue(expectedValue: string, options?: Options): Promise<R>;
      toContainValue(expectedValue: string, options?: Options): Promise<R>;
      toBeEnabled(expectedState: boolean, options?: Options): Promise<R>;
      toBeDisabled(expectedState: boolean, options?: Options): Promise<R>;
      toBeVisible(expectedState: boolean, options?: Options): Promise<R>;
      toHaveCount(expectedCount: number): Promise<R>;
      /**
       * Match snapshot
       */
      toMatchSnapshot(options?: { name?: string; threshold?: number }): R;
      /**
       * Match snapshot
       */
      toMatchSnapshot(
        name: string,
        options?: {
          threshold?: number;
        },
      ): R;
    }
  }

  namespace jest {
    type Matchers<R> = PlaywrightTest.Matchers<R>;
  }
}

export const matchers: any;
