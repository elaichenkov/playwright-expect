import { test, expect } from '@playwright/test';
import { BASE_URL } from '../src/utils/constants';

const selector = '.example h3';

test.describe('toContainText', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/context_menu`);
  });

  test('verify method with Promise<ElementHandle>', async ({ page }) => {
    const expectedText = 'Menu';

    await expect(page.$(selector)).toContainText(expectedText);
  });

  test('verify method with ElementHandle', async ({ page }) => {
    const expectedText = 'context menu';
    await expect([page, selector]).toContainText(expectedText, { ignoreCase: true });
  });

  test('verify method with [page, selector] Array', async ({ page }) => {
    const expectedText = 'Context Menu';

    await expect([page, selector]).toContainText(expectedText, { textMethod: 'innerText' });
  });

  test('verify method with [page, selector] Array and wait options', async ({ page }) => {
    const expectedText = 'cool';
    const timeout = 3000;

    setTimeout(async () => {
      await page.setContent(`<span id="tick">${expectedText}</span>`);
    }, 1000);

    await expect([page, '#tick']).toContainText(expectedText, { timeout });
  });
});
