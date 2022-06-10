# puppy

Yet another `puppeteer` derivative. A tiny wrapper around `playwright` amending `chromium` with a Polkadot{.js} extension. Alice, Bob, Charlie, Dave, Eve, and Ferdie have their accounts preimported.

## Install

```bash
npx playwright install-deps chromium
npm i todo/puppy
```

## Usage

`e2e.spec.ts`

```ts
import { test } from "puppy" // + the rest from @playwright/test

test.describe("your dapp", () => {
  test("connect wallet", async ({ dapp, pdot }) => {
    await dapp.click("text=Connect Wallet")
    await dapp.locator("text=Polkadot").click()

    await pdot.connectDapp()
  })
})
```

## `pdot`

The `pdot` fixture looks like this:

```ts
export interface PdotPage extends Page {
  importAccount( // import an account
    name: string, // pdot ext account name
    password: string, // pdot ext account password
    mnemonic: string, // 12 or 24 words
    newPage?: boolean // import using a new temp pdot ext page?
  ): Promise<void>
  connectDapp(): Promise<void> // authorize a connect wallet request
  confirmTransaction(): Promise<void> // confirm an extrinsic call
}
```
