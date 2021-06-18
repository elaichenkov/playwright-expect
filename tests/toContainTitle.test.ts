import { test, expect } from '@playwright/test';
import { BASE_URL } from '../src/utils/constants';

test.describe('toContainTitle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}`);
  });

  test('verify method positive', async ({ page }) => {
    const expectedTitle = 'The';

    await expect(page).toContainTitle(expectedTitle);
  });

  test('verify method with ignoreCase property', async ({ page }) => {
    const expectedTitle = 'the';

    await expect(page).toContainTitle(expectedTitle, { ignoreCase: true });
  });

  test('verify method negative', async ({ page }) => {
    const expectedTitle = 'the internet';

    await expect(page).not.toContainTitle(expectedTitle);
  });
});
