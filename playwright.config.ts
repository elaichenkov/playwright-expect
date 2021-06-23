// eslint-disable-next-line import/no-extraneous-dependencies
import { PlaywrightTestConfig, expect } from '@playwright/test';
import { matchers } from './src';

expect.extend(matchers);

const config: PlaywrightTestConfig = {
  // Add use property for all projects (browsers)
  use: {
    headless: true,
  },

  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],
  testIgnore: 'tests/utils.spec.ts',
};

export default config;
