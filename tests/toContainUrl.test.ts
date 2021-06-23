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

  test('verify method with wait options', async ({ page }) => {
    const timeout = 5000;

    setTimeout(async () => {
      await page.goto(`${BASE_URL}/status_codes`);
    }, 1000);

    await expect(page).toContainUrl('status_codes', { timeout });
  });
});
