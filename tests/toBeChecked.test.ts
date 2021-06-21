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
});
