# expect-playwright-test [![tests](https://github.com/elaichenkov/expect-playwright-test/actions/workflows/tests.yml/badge.svg)](https://github.com/elaichenkov/expect-playwright-test/actions/workflows/tests.yml)

The `expect-playwright-test` is an assertion library for TypeScript and JavaScript intended for use with a test runner such as Jest or Playwright Test. That lets you write better assertions for end-to-end testing.

# Motivation
> [expect-playwright](https://github.com/playwright-community/expect-playwright) is a great library, but there are a few methods and that's it.

And [expect-playwright-test](https://github.com/elaichenkov/expect-playwright-test) is a great library too, with all major methods and extra features such as waits, ignore case sensitive, trim. All in all, It has everything that you demand to accomplish end-to-end testing needs.

## Key Features
* rich and easy to use
* exhaustive messages and diff highlights
* can ignore case sensitive and trim values before asserting
* waits for expectation to succeed
* works in Jest and Playwright Test
* built-in types for TypeScript and JavaScript autocompletion

# Usage

```sh
npm i -D expect-playwright-test
```

# [API]()
* toBeDisabled
* toBeEnabled
* toBeChecked
* toBeFocused
* toBeVisible
* toContainText
* toContainTitle
* toContainUrl
* toContainValue
* toHaveCount
* toHaveText
* toHaveTitle
* toHaveUrl
* toHaveValue
* toMatchText

# Examples

> Almost all methods can accept element in three ways:
> 1. ElementHandle
> 2. Promise\<ElementHandle>
> 3. [page, selector]
## Use `toHaveText` to check that element's text equals to the expected

```typescript
// Using ElementHandle
const title = await page.$('h1');

await expect(title).toHaveText('Home');

// Using Promise<ElementHandle>
await expect(page.$('h1')).toHaveText('Home');

// Using an array of page and selector. Furthermore, you can pass options such as ignoreCase and trim
await expect([page, 'h1']).toHaveText('home', { ignoreCase: true });
```
## Use `toBeVisible` to check that element is visible
```typescript
// Using ElementHandle
const button = await page.$('#next');

await expect(title).toBeVisible();

// Using Promise<ElementHandle>
await expect(page.$('#next')).toBeVisible(true); // true here is optional

// Using an array of page and selector
await expect([page, '#next']).toBeVisible(false);
```


## Use `toBeEnabled` and `toBeDisabled` to check that element is enabled/disabled

```typescript
// Using ElementHandle
const button = await page.$('#next');

await expect(title).toBeEnabled();

// Using Promise<ElementHandle>
await expect(page.$('#next')).toBeEnabled();

// Using an array of page and selector
await expect([page, '#next']).toBeEnabled(false);

// Also, you can use `not` to verify opposite
await expect([page, '#next']).not.toBeEnabled();

// Even more, you can check that element is disabled
await expect(page.$('#next')).toBeDisabled();
```

## Use `toHaveUrl` and `toContainUrl` to check that page's url equals or contains the expected url
```typescript
await expect(page).toHaveUrl('https://duckduckgo.com/');

// Also, you can wait for the url
await expect(page).toHaveUrl('https://duckduckgo.com/', { timeout: 5000 });

await expect(page).toContainUrl('duck');
```
## Use `toHaveTitle` or `toContainTitle` to check that page's title equals or contains the expected title

```typescript
await expect(page).toHaveTitle('DuckDuckGo — Privacy, simplified.');

await expect(page).toContainTitle('Privacy');

// ignore case sensitive
await expect(page).toContainTitle('privacy', {ignoreCase: true});
```
# Author
Yevhen Laichenkov <elaichenkov@gmail.com>
# Inspired by
[expect-playwright](https://github.com/playwright-community/expect-playwright)

[expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
