import { test, expect } from '@playwright/test';
import { BASE_URL } from '../src/utils/constants';

const selector = '#btn';

test.describe('toBeEnabled', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/inputs`);
    await page.setContent('<button id="btn" disabled>Click me</button>');
  });

  test('verify method with Promise<ElementHandle>', async ({ page }) => {
    await expect(page.$(selector)).toBeEnabled(false);
  });

  test('verify method with ElementHandle', async ({ page }) => {
    await page.$eval(selector, (button) => button.removeAttribute('disabled'));

    await expect(await page.$(selector)).toBeEnabled();
  });

  test('verify method with [page, selector] Array', async ({ page }) => {
    await expect([page, selector]).not.toBeEnabled(true);
  });

  test('verify method with [page, selector] Array and wait options', async ({ page }) => {
    const timeout = 3000;

    setTimeout(async () => {
      await page.setContent('<input type="checkbox" id="tick">');
    }, 1000);

    await expect([page, '#tick']).toBeEnabled(true, { timeout });
  });
});
