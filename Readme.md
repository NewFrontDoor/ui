# newfrontdoor/ui

## Getting started

Install `pnpm` through Corepack or your preferred package manager.

1. `pnpm install`
1. `pnpm cosmos`

## Regular tasks

### Installing workspace dependencies

To install a specific package to all workspaces

`pnpm add -D ${package}`

### Installing dependencies to a specific package

To install a specific package to a specific workspace

`pnpm --filter @newfrontdoor/${workspace} add ${package} {--save-dev}`

### Bundling

When importing published package outputs within the ui library, make sure they have been bundled.
Run `pnpm run build` when package `dist` output is needed.

If you make a change to a package you depend on,
run `pnpm run build` to ensure the changes have been bundled.

### Component fixtures

Cosmos is the component fixture browser.

1. `pnpm install`
1. `pnpm run build` if you need package `dist` output
1. `pnpm cosmos`

Use `pnpm cosmos:export` to produce a static fixture export in `cosmos-export`.

### Publishing a package

1. Create a branch with your changes
1. From the root of the monorepo, run `pnpm changeset` and follow the prompts
1. Create a Pull Request with the generated changeset, and your changes
1. Merge your Pull Request once the tests pass
1. Once merged, the release workflow will start
1. A "Version Packages" PR will be created from any unreleased changesets
1. Once you're ready to release your changes, merge the "Version Packages" PR
