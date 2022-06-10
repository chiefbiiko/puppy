import { test as _test, chromium, BrowserContext, Page } from "@playwright/test"
import { join, resolve } from "path"
import { tmpdir, homedir } from "os"
import { lstatSync } from "fs"
import { randomBytes } from "crypto"

export * from "@playwright/test"

///////////////////////////////// CUSTOMIZATION ///////////////////////////////

// https://playwright.dev/docs/chrome-extensions
// https://www.petroskyriakou.com/how-to-load-a-chrome-extension-in-playwright
// https://github.com/ChainSafe/dappeteer

export const BASE_MNEMONIC =
  "bottom drive obey lake curtain smoke basket hold race lonely fit walk"

export const PASSWORD = "sesameopen"

export const PDOT_EXT_BUILD_DIR = resolve('build')
// join(
//   homedir(),
//   ".polkadot.js-extension",
//   "packages",
//   "extension",
//   "build"
// )

if (!lstatSync(PDOT_EXT_BUILD_DIR).isDirectory()) {
  throw Error(`not a dir '${PDOT_EXT_BUILD_DIR}'`)
}

export interface PdotPage extends Page {
  importAccount(
    name: string,
    password: string,
    mnemonic: string,
    newPage?: boolean
  ): Promise<void>
  connectDapp(): Promise<void>
  confirmTransaction(): Promise<void>
}

export const test = _test.extend({
  async ctx({}, use) {
    const cwd = join(tmpdir(), `puppy-${randomBytes(4).toString("hex")}`)

    console.debug(`using pdot ext build at ${PDOT_EXT_BUILD_DIR}`)
    console.debug(`launching persistent browser context in ${cwd}`)

    const ctx = await chromium.launchPersistentContext(cwd, {
      headless: false,
      args: [
        `--disable-extensions-except=${PDOT_EXT_BUILD_DIR}`,
        `--load-extension=${PDOT_EXT_BUILD_DIR}`,
      ],
    })

    // add a 2nd page 4 pdot ext - page 0 = dapp - page 1 = pdot
    await ctx.newPage()

    await use(ctx)

    await ctx.close()
  },
  async pdot({ ctx }, use) {
    const p = getPdotPage(ctx)

    p.importAccount = importAccount.bind(ctx) as (
      name: string,
      password: string,
      mnemonic: string,
      newPage?: boolean
    ) => Promise<void>

    p.connectDapp = async function connectDapp(): Promise<void> {
      await p.goto(getExtUrl(ctx))
      await p.click("text=Yes, allow this application access")
    }

    p.confirmTransaction = async function (): Promise<void> {
      // todo
    }

    await passWelcomeScreen(ctx)

    await Promise.all([
      importAccount(ctx, "alice", PASSWORD, `${BASE_MNEMONIC}//Alice`, true),
      importAccount(ctx, "bob", PASSWORD, `${BASE_MNEMONIC}//Bob`, true),
      importAccount(
        ctx,
        "charlie",
        PASSWORD,
        `${BASE_MNEMONIC}//Charlie`,
        true
      ),
      importAccount(ctx, "dave", PASSWORD, `${BASE_MNEMONIC}//Dave`, true),
      importAccount(ctx, "eve", PASSWORD, `${BASE_MNEMONIC}//Eve`, true),
      importAccount(ctx, "ferdie", PASSWORD, `${BASE_MNEMONIC}//Ferdie`, true),
    ])

    await getDappPage(ctx).bringToFront()

    await use(p)
  },
  async dapp({ ctx, baseURL }, use) {
    const p = getDappPage(ctx)
    if (baseURL) {
      await p.goto(baseURL)
    }
    await use(p)
  },
})

///////////////////////////////////// LIB /////////////////////////////////////

function getDappPage(ctx: BrowserContext): Page {
  const pages = ctx.pages()
  if (!pages.length) {
    throw Error("can't find dapp page")
  }
  return pages[0]
}

function getPdotPage(ctx: BrowserContext): PdotPage {
  const pages = ctx.pages()
  if (pages.length !== 2) {
    throw Error("can't find pdot page")
  }
  return pages[1] as PdotPage
}

function getExtId(ctx: BrowserContext): string {
  let id
  for (const bg of ctx.backgroundPages()) {
    const url = bg.url()
    console.debug(`getExtId bg.url() ${url}`)
    if (url.includes("chrome-extension")) {
      id = url.replace(/^.+:\/\/([a-zA-Z0-9]+)\/.+$/, "$1")
    }
  }
  if (!id) {
    throw Error("can't derive ext id")
  }
  console.debug(`getExtId id ${id}`)
  return id
}

function getExtUrl(ctx: BrowserContext): string {
  return `chrome-extension://${getExtId(ctx)}/index.html`
}

async function passWelcomeScreen(ctx: BrowserContext): Promise<void> {
  const p = getPdotPage(ctx)
  await p.goto(getExtUrl(ctx))
  await p.click("text=Understood, let me continue")
}

async function importAccount(
  ctx: BrowserContext,
  name: string,
  password: string,
  mnemonic: string,
  newPage?: boolean
): Promise<void> {
  const p = newPage ? await ctx.newPage() : getPdotPage(ctx)
  await p.goto(getExtUrl(ctx))

  // popup import via seed btn
  await p.click(
    "#root > main > div.Header-sc-di0o5f-0.kQUVYa > div > div.popupMenus > div:nth-child(1)"
  )

  // click import via seed btn
  await p.click("text=Import account from pre-existing seed")

  // insert mnemonic
  await p.type(
    "#root > main > div.SeedAndPath-sc-pwhu7p-0.dGhVGc > div.Label-sc-1m5io7b-0.iRAJWc.seedInput > textarea",
    mnemonic
  )

  // click next
  await p.click("#root > main > div.ButtonArea-sc-1254szc-0.gCQZqr > button")

  // set account name
  await p.type("#root > main > div:nth-child(3) > div > input", name)

  // set account password
  await p.type("#root > main > div:nth-child(4) > div > input", password)

  // confirm account password
  await p.type(
    "#root > main > div:nth-child(5) > div.Label-sc-1m5io7b-0.iRAJWc.InputWithLabel-sc-15f3f7q-0.elYtUe > input",
    password
  )

  // click add account
  await p.click("text=Add the account with the supplied seed")

  if (newPage) {
    await p.close()
  }
}

export async function sleep(ms): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
