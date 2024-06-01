FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app

ARG SCHOOL_WEB_VERSION
ARG SCHOOL_CORE_API_VERSION

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN VITE_SCHOOL_WEB_VERSION=$SCHOOL_WEB_VERSION pnpm run --filter=school-web build
RUN pnpm run --filter=school-core-api build

RUN pnpm deploy --filter=school-web --prod /prod/school-web
RUN pnpm deploy --filter=school-core-api --prod /prod/school-core-api

FROM nginx AS school-web
COPY --from=build /prod/school-web/dist /usr/share/nginx/html
COPY --from=build /prod/school-web/config/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;"]

FROM base AS school-core-api
COPY --from=build /prod/school-core-api /prod/school-core-api

ARG SCHOOL_CORE_API_VERSION
ENV SCHOOL_CORE_API_VERSION=$SCHOOL_CORE_API_VERSION

WORKDIR /prod/school-core-api
EXPOSE 3000
CMD [ "pnpm", "start:prod" ]