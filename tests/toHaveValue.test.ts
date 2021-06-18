import { test, expect } from '@playwright/test';
import { BASE_URL } from '../src/utils/constants';

const selector = '#field';

test.describe('toHaveValue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/inputs`);
    await page.setContent(`<input id="field">`);
  });

  test('verify method with Promise<ElementHandle>', async ({ page }) => {
    const expectedText = '';

    await expect(page.$(selector)).toHaveValue(expectedText);
  });

  test('verify method with ElementHandle', async ({ page }) => {
    const expectedText = 'context menu';
    await page.fill(selector, expectedText.toUpperCase());

    await expect(await page.$(selector)).toHaveValue(expectedText, { ignoreCase: true });
  });

  test('verify method with [page, selector] Array', async ({ page }) => {
    const expectedText = 'Context Menu';
    await page.fill(selector, ` ${expectedText} `);

    await expect([page, selector]).toHaveValue(expectedText, { trim: true });
  });
});
