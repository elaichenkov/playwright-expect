import { test, expect } from '@playwright/test';
import { BASE_URL } from '../src/utils/constants';

const selector = '#btn';

test.describe('toBeVisible', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/inputs`);
  });

  test('verify method with Promise<ElementHandle>', async ({ page }) => {
    await expect(page.$(selector)).toBeVisible(false);
  });

  test('verify method with ElementHandle', async ({ page }) => {
    await page.setContent('<button id="btn">Click me</button>');

    await expect(await page.$(selector)).toBeVisible();
  });

  test('verify method with [page, selector] Array', async ({ page }) => {
    await page.setContent('<span></span>');

    await expect([page, selector]).toBeVisible(false);
  });

  test('verify method with [page, selector] Array with opposite `not`', async ({ page }) => {
    await page.setContent('<span></span>');

    await expect([page, selector]).not.toBeVisible();
  });
});
