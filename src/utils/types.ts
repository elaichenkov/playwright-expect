import type { ElementHandle, Page } from 'playwright-core';

export interface PageWaitForSelectorOptions {
  selector?: string;
  state?: 'visible' | 'attached';
  timeout?: number;
}

export type PageSelector = [page: Page, selector: string];

export type UIElement = Promise<ElementHandle<Node>> | ElementHandle<Node> | PageSelector;

export type Options = {
  textMethod?: 'textContent' | 'innerText';
  ignoreCase?: boolean;
  trim?: boolean;
  waitForState?: PageWaitForSelectorOptions;
  waitForUrl?: {
    url: string | RegExp;
    options: {
      timeout?: number;
      waitUntil?: 'load' | 'domcontentloaded' | 'networkidle';
    };
  };
};
