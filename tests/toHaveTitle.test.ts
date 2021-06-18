import { test, expect } from '@playwright/test';
import { BASE_URL } from '../src/utils/constants';

test.describe('toHaveTitle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}`);
  });

  test('verify method positive', async ({ page }) => {
    const expectedTitle = 'The Internet';

    await expect(page).toHaveTitle(expectedTitle);
  });

  test('verify method with ignoreCase property', async ({ page }) => {
    const expectedTitle = 'the internet';

    await expect(page).toHaveTitle(expectedTitle, { ignoreCase: true });
  });

  test('verify method negative', async ({ page }) => {
    const expectedTitle = 'the internet';

    await expect(page).not.toHaveTitle(expectedTitle);
  });
});
