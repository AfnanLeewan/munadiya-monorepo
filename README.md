# Pluton project

Pluton project mono repository

## Overview

![project overview](/assets/images/project-overview.jpg)

"🚧 Changes may occur in the future as the project is still in its initial phase."

### School-web

For more details about the `school-web` package, see the [README](./packages/school-web/README.md) in its directory.

### School-core-ai

For more details about the `school-core-api` package, see the [README](./packages/school-core-api/README.md) in its directory.

## Basics

1. Install dependencies for all `/packages/*` recursively

```bash
$ pnpm i -r

# or Install dependencies for each project individually
$ cd packages/school-web
$ pnpm i
```

2. Running basic checks

```bash
$ pnpm format:check # check format
$ pnpm lint # check lint error
$ pnpm typecheck # check type error.
```

## Release workflow

We use [changesets](https://github.com/changesets/changesets) for versioning services and publish packages to NPM. See the steps below

1. Start versioning package by running

```bash
$ pnpm changeset # select {patch,minor,major} version and add changes summary
```

2. Push code and open PR.
3. After the PR is approved and merged to **main** branch, the `release.yml` workflow will be triggered and **it will create another PR (by _github_actions[bot]_)** that bump version for services/packages that's selected from step 1. [See example](https://github.com/SkillLane/pluton-monorepo/pull/7)
4. Merge the auto created PR from 3. to **main** branch. After that the corresponding tag and release will be created
5. From 4, [build_and_push_image](https://github.com/SkillLane/pluton-monorepo/blob/main/.github/workflows/release.yml#L77) will be triggered then build and push docker image to the registry.

> 📌 ps. You don't need to run `changeset` if you don't want to release a new version.

## Docker

Following are example commands that use for building docker image.

```sh
$ docker build . --target school-web --tag school-web:tag # to build docker image for school-web
$ docker build . --target school-core-api --tag school-core-api:tag # to build docker image for school-core-api
```


## Development Guideline

https://skilllane.atlassian.net/wiki/spaces/PLUT/pages/2486731026/Development+guideline