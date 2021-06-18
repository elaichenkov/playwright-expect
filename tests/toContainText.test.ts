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
});
