# newfrontdoor/ui

## Getting started

Install `yarn` (`>v1.7.0`)

1. `npm i -g yarn`
1. `yarn install`
1. `yarn babel`
1. `yarn cosmos`

## Regular tasks

### Installing workspace dependencies

To install a specific package to all workspaces

`yarn add -DW ${package}`

### Installing dependencies to a specific package

To install a specific package to a specific workspace

`yarn workspace @newfrontdoor/${workspace} add ${package} {--dev}`

## Publishing a package

1. `cd packages/${package}`
1. `npm version {patch/minor/major}`
1. commit and push version change to master
1. `npm publish`
