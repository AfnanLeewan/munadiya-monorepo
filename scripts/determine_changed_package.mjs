#!/usr/bin/env zx

let packagesNeedToRebuild = new Set()
const targetBranch = process.env.TARGET_BRANCH

await $`git fetch --prune origin`

// Get a list of files that have changed between the main and head commits
let changedFiles = (
  await $`git diff --name-only origin/${targetBranch} HEAD`
).stdout.split('\n')

// Define package paths and their corresponding package names
const packagesToCheck = [
  { path: 'packages/school-core-api/', name: 'school-core-api' },
  { path: 'packages/school-web/', name: 'school-web' },
  { path: 'packages/school-e2e-tests/', name: 'school-e2e-tests' },
  { path: 'packages/central-core-api/', name: 'central-core-api' },
  { path: 'packages/central-web/', name: 'central-web' },
  { path: 'packages/video-transcoder', name: 'video-transcoder' },
]
function shouldRebuildPackage(file, packageName, pathStartsWith) {
  return file.startsWith(pathStartsWith)
}

changedFiles.forEach((file) => {
  packagesToCheck.forEach(({ path, name }) => {
    if (shouldRebuildPackage(file, name, path)) {
      packagesNeedToRebuild.add(name)
    }
  })
})

// Convert the set of packages to a JSON (use for GitHub actions strategy matrix)
let jsonString = JSON.stringify([...packagesNeedToRebuild])

console.log(jsonString)
