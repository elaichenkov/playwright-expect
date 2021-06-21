/* eslint-disable @typescript-eslint/ban-ts-comment */
import matchers from './matchers/index';

// @ts-ignore
if (global.expect) {
  // @ts-ignore
  global.expect.extend(matchers);
}

export { matchers };
