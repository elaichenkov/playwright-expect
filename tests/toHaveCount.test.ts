import { test, expect } from '@playwright/test';
import { BASE_URL } from '../src/utils/constants';

const selector = '#elements button';

test.describe('toHaveCount', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/add_remove_elements/`);
  });

  test('verify method with Promise<ElementHandle>', async ({ page }) => {
    const expectedCount = 1;
    await page.click('.example button');

    await expect(page.$$(selector)).toHaveCount(expectedCount);
  });

  test('verify method with ElementHandle', async ({ page }) => {
    const expectedCount = 3;

    await page.click('.example button');
    await page.click('.example button');
    await page.click('.example button');

    await expect(await page.$$(selector)).toHaveCount(expectedCount);
  });

  test('verify method with [page, selector] Array', async ({ page }) => {
    const expectedCount = 0;

    await expect([page, selector]).toHaveCount(expectedCount);
  });
});
