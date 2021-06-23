import { test, expect } from '@playwright/test';
import { BASE_URL } from '../src/utils/constants';

const selector = '#btn';

test.describe('toBeDisabled', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/inputs`);
    await page.setContent('<button id="btn">Click me</button>');
  });

  test('verify method with Promise<ElementHandle>', async ({ page }) => {
    await expect(page.$(selector)).toBeDisabled(false);
  });

  test('verify method with ElementHandle', async ({ page }) => {
    await page.$eval(selector, (button) => button.setAttribute('disabled', 'true'));

    await expect(await page.$(selector)).toBeDisabled();
  });

  test('verify method with [page, selector] Array', async ({ page }) => {
    await expect([page, selector]).not.toBeDisabled(true);
  });

  test('verify method with [page, selector] Array and wait options', async ({ page }) => {
    const timeout = 3000;

    setTimeout(async () => {
      await page.setContent('<input type="checkbox" id="tick" disabled>');
    }, 1000);

    await expect([page, '#tick']).toBeDisabled(true, { timeout });
  });
});
