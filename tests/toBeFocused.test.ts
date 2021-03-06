import { test, expect } from '@playwright/test';
import { BASE_URL } from '../src/utils/constants';

const selector = 'input';

test.describe('toBeFocused', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/inputs`);
  });

  test('verify method with Promise<ElementHandle>', async ({ page }) => {
    await expect(page.$(selector)).toBeFocused(false);
  });

  test('verify method with ElementHandle', async ({ page }) => {
    await page.focus(selector);

    await expect(await page.$(selector)).toBeFocused();
  });

  test('verify method with [page, selector] Array', async ({ page }) => {
    await expect([page, selector]).not.toBeFocused(true);
  });

  test('verify method with [page, selector] Array and wait options', async ({ page }) => {
    const timeout = 3000;

    setTimeout(async () => {
      await page.setContent('<input type="checkbox" id="tick">');
    }, 1000);

    await expect([page, '#tick']).toBeFocused(false, { timeout });
  });
});
