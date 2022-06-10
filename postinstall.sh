#!/bin/bash

repo=$HOME/.polkadot.js-extension
tag=$(jq -r .polkadotJsExtension.version ./package.json)

mkdir -p $repo

git clone \
  --depth 1 \
  --branch $tag \
  https://github.com/polkadot-js/extension \
  $repo

cd $repo/packages/extension

yarn install 

npx webpack --config webpack.extension.cjs --mode production