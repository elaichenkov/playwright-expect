import { test, expect } from '@playwright/test';
import { BASE_URL } from '../src/utils/constants';

test.describe('toHaveUrl', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/context_menu`);
  });

  test('verify method positive', async ({ page }) => {
    const expectedUrl = `${BASE_URL}/context_menu`;

    await expect(page).toHaveUrl(expectedUrl);
  });

  test('verify method negative', async ({ page }) => {
    await expect(page).not.toHaveUrl(BASE_URL);
  });
});
