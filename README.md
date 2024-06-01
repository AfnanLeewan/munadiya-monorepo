# Munadiya project

Munadiya project mono repository

front-end : package/web

back-end : package/core-api

## Overview
1. Install dependencies for all `/packages/*` recursively

```bash
$ pnpm i -r
# or Install dependencies for each project individually
$ cd packages/school-web
$ pnpm i
```
2. Running Backend
```bash
$ cd packages/core-api
$ pnpm start
```
3. Running Frontend
```bash
$ cd packages/web
$ pnpm run dev
```