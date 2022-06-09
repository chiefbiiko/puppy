import { test, sleep } from "./index"

test.use({ baseURL: "http://localhost:3000/wallet" })

test.describe("dapp", () => {
  test("connect wallet", async ({ dapp, pdot }) => {
    await dapp.click("text=Connect Wallet")
    await dapp.locator("text=Polkadot").last().click()

    await pdot.connectDapp()

    await sleep(29999)
  })
})
