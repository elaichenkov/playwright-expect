import type { ElementHandle, Page } from 'playwright-core';

export type PageSelector = [page: Page, selector: string];

export type UIElement = Promise<ElementHandle<Node>> | ElementHandle<Node> | PageSelector;
export type UIElements = Promise<Array<ElementHandle>> | Array<ElementHandle> | PageSelector;

export type Options = {
  textMethod?: 'textContent' | 'innerText';
  ignoreCase?: boolean;
  trim?: boolean;
  timeout?: number;
  state?: 'visible' | 'attached';
};

export type PageWaitForUrlOptions = {
  timeout: number;
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle';
};
