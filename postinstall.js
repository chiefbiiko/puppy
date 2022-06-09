const exec = require("util").promisify(require("child_process").exec)
const {
  polkadotJsExtension: { localRepo: dir, version },
} = require("./package.json")

async function main() {
  console.debug("pulling and bundling the polkadot{.js} extension...")
  await exec(`mkdir -p ${dir}`)
  await exec(
    `git clone --depth 1 --branch ${version} https://github.com/polkadot-js/extension ${dir}`
  )
  await exec(`yarn --cwd ${dir} install`)
  await exec(`yarn --cwd ${dir} run build:ui`)
  await exec(`npx playwright install --with-deps chromium`)
}

main()
