// eslint-disable-next-line import/no-extraneous-dependencies
import { PlaywrightTestConfig, expect } from '@playwright/test';
import playwrightMatchers from './src/matchers';

expect.extend(playwrightMatchers);

const config: PlaywrightTestConfig = {
  // Add use property for all projects (browsers)
  use: {
    headless: true,
  },

  projects: [
    {
      name: 'Chrome Stable',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
  ],
  testIgnore: 'tests/utils.spec.ts',
};

export default config;
