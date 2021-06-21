import type { Options } from './types';

export const DEFAULT_OPTIONS: Options = {
  textMethod: 'textContent',
  waitForState: {
    state: 'visible',
    timeout: 30000,
  },
};

export const BASE_URL = 'http://the-internet.herokuapp.com';
export const DEFAULT_TIMEOUT = 30000;
