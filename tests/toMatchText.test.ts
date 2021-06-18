import { test, expect } from '@playwright/test';
import { BASE_URL } from '../src/utils/constants';

const selector = '.example h3';

test.describe('toMatchText', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/context_menu`);
  });

  test('verify method with Promise<ElementHandle>', async ({ page }) => {
    const expectedPattern = /[C|c]ontext/;

    await expect(page.$(selector)).toMatchText(expectedPattern);
  });

  test('verify method with ElementHandle', async ({ page }) => {
    const expectedPattern = /context/gi;

    await expect(await page.$(selector)).toMatchText(expectedPattern);
  });

  test('verify method with [page, selector] Array', async ({ page }) => {
    const expectedPattern = /[C|c]ontext/;

    await expect([page, selector]).toMatchText(expectedPattern, { textMethod: 'innerText' });
  });
});
