/* eslint-disable @typescript-eslint/ban-ts-comment */
import customMatchers from './matchers/index';

// @ts-ignore
if (global.expect) {
  // @ts-ignore
  // for jest
  global.expect.extend(customMatchers);
} else if (expect) {
  // for playwright test
  expect.extend(customMatchers);
}

export { customMatchers };
