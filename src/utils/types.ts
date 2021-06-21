import type { ElementHandle, Page } from 'playwright-core';

export interface PageWaitForSelectorOptions {
  selector?: string;
  state?: 'visible' | 'attached';
  timeout?: number;
}

export type PageSelector = [page: Page, selector: string];

/**
 * A number, or a string containing a number.
 * @typedef {Promise<ElementHandle<Node>> | ElementHandle<Node> | PageSelector} UIElement
 */
export type UIElement = Promise<ElementHandle<Node>> | ElementHandle<Node> | PageSelector;

export type Options = {
  textMethod?: 'textContent' | 'innerText';
  ignoreCase?: boolean;
  trim?: boolean;
  waitForState?: PageWaitForSelectorOptions;
};

export type PageWaitForUrlOptions = {
  timeout: number;
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle';
};
