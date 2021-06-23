import { test, expect } from '@playwright/test';
import { BASE_URL } from '../src/utils/constants';

const selector = '.example h3';

test.describe('toHaveText', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/context_menu`);
  });

  test('verify method with Promise<ElementHandle>', async ({ page }) => {
    const expectedText = 'Context Menu';

    await expect(page.$(selector)).toHaveText(expectedText);
  });

  test('verify method with ElementHandle', async ({ page }) => {
    const expectedText = 'context menu';

    await expect(await page.$(selector)).toHaveText(expectedText, { ignoreCase: true });
  });

  test('verify method with [page, selector] Array', async ({ page }) => {
    const expectedText = 'Context Menu';

    await expect([page, selector]).toHaveText(expectedText, { textMethod: 'innerText' });
  });

  test('verify method with [page, selector] and wait options', async ({ page }) => {
    const timeout = 3000;
    const EXPECTED_TEXT = 'Success';

    setTimeout(() => {
      page.setContent(`<span id="toast"> ${EXPECTED_TEXT} </span>`);
    }, 1000);

    await expect([page, '#toast']).toHaveText(EXPECTED_TEXT, { timeout, trim: true });
  });
});
