#!/usr/bin/env zx

const dockerUsername = 'asia.gcr.io/skilllane-pluton'

const [serviceName, serviceVersion] = argv.releaseTag.split('@')
const baseImage = `${dockerUsername}/${serviceName}:${serviceVersion}`

await $`git fetch --tags`

const releaseTagExists = await $`git tag -l ${argv.releaseTag}`

if (!releaseTagExists.stdout) {
  console.log('Invalid release tag. Exiting.')
  process.exit(1)
}

if (argv.env === 'stg') {
  console.log(
    'Deploy to staging (UAT) is not allowed from this script. Exiting...',
  )
  process.exit(1)
}

let sourceImage
if (argv.env === 'stg' || argv.env === 'qa') {
  sourceImage = `${baseImage}-dev`
} else if (argv.env === 'production') {
  sourceImage = `${baseImage}-stg`
}

const sourceImageExists = await $`docker manifest inspect ${sourceImage}`

if (!sourceImageExists.stderr) {
  console.log(`Image ${sourceImage} found on the registry.`)
} else {
  console.log(`Image ${sourceImage} not found on the registry. Exiting...`)
  process.exit(1)
}

if (argv.env === 'stg' || argv.env === 'qa') {
  console.log('Using the dev image for deployment. Exiting...')
} else {
  console.log(`Retagging and pushing the image "${baseImage}" to production...`)

  await $`docker pull ${sourceImage}`
  await $`docker tag ${sourceImage} ${baseImage}`
  await $`docker push ${baseImage}`
}
