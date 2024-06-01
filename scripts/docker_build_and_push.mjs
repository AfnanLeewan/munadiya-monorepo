#!/usr/bin/env zx

const dockerUsername = 'asia.gcr.io/skilllane-pluton'
const services = ['school-web', 'school-core-api']
const publishPackages = JSON.parse(argv.packages)

const targetServices = publishPackages.filter((pkg) =>
  services.includes(pkg.name),
)

for (const service of targetServices) {
  const serviceVersionKey = `${service.name
    .toUpperCase()
    .replaceAll('-', '_')}_VERSION`
  const serviceVersionTag = `${service.version}-${argv.env}`
  await $`docker build --build-arg "${serviceVersionKey}=${serviceVersionTag}" --target=${service.name} -t ${service.name}:${service.version} .`
  await $`docker tag ${service.name}:${service.version} ${dockerUsername}/${service.name}:${service.version}-${argv.env}`
  await $`docker push ${dockerUsername}/${service.name}:${service.version}-${argv.env}`
}
