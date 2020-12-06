# newfrontdoor/ui

## Getting started

Install `yarn` (`>v1.7.0`)

1. `npm i -g yarn`
1. `yarn install`
1. `yarn cosmos`

## Regular tasks

### Installing workspace dependencies

To install a specific package to all workspaces

`yarn add -DW ${package}`

### Installing dependencies to a specific package

To install a specific package to a specific workspace

`yarn workspace @newfrontdoor/${workspace} add ${package} {--dev}`

### Bundling

When importing other packages within the ui library, make sure they have been bundled.
Either run `yarn install`, (or `yarn prepare`, which runs after install)

If you make a change to a package you depend on,
make sure you run `yarn prepare` to ensure the changes have been bundled

### Publishing a package

1. Create a branch with your changes
1. From the root of the monorepo, run `yarn changeset` and follow the prompts
1. Create a Pull Request with the generated changeset, and your changes
1. Merge your Pull Request once the tests pass
1. Once merged, the release workflow will start
1. A "Version Packages" PR will be created from any unreleased changesets
1. Once you're ready to release your changes, merge the "Version Packages" PR
