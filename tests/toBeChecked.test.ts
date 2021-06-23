import { test, expect } from '@playwright/test';
import { BASE_URL } from '../src/utils/constants';

const selector = '#checkboxes input';

test.describe('toBeChecked', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/checkboxes`);
  });

  test('verify method with Promise<ElementHandle>', async ({ page }) => {
    await expect(page.$(selector)).toBeChecked(false);
  });

  test('verify method with ElementHandle', async ({ page }) => {
    await page.check(selector);

    await expect(await page.$(selector)).toBeChecked();
  });

  test('verify method with [page, selector] Array', async ({ page }) => {
    await expect([page, selector]).not.toBeChecked(true);
  });

  test('verify method with [page, selector] Array and wait options', async ({ page }) => {
    const timeout = 3000;

    setTimeout(async () => {
      await page.setContent('<input type="checkbox" id="tick">');
    }, 1000);

    await expect([page, '#tick']).toBeChecked(false, { timeout });
  });
});
