/* eslint-disable @typescript-eslint/ban-ts-comment */
import customMatchers from './matchers/index';

// @ts-ignore
if (global.expect) {
  // @ts-ignore
  global.expect.extend(customMatchers);
}

export { customMatchers };
