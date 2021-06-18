import { test, expect } from '@playwright/test';
import { BASE_URL } from '../src/utils/constants';

test.describe('toContainUrl', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/context_menu`);
  });

  test('verify method positive', async ({ page }) => {
    await expect(page).toContainUrl(BASE_URL);
  });

  test('verify method negative', async ({ page }) => {
    await expect(page).not.toContainUrl(`${BASE_URL}/1`);
  });
});
