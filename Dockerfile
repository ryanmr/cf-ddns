# learn more:
# https://hub.docker.com/r/oven/bun
FROM oven/bun:1.0.7-alpine

RUN apk add --no-cache tini

WORKDIR /app

COPY package.json /app/package.json
COPY bun.lockb /app/bun.lockb
COPY tsconfig.json /app/tsconfig.json

COPY src/ /app/src/

RUN bun install --production --frozen-lockfile

# tini increases shutdown reliability
# https://github.com/krallin/tini
ENTRYPOINT ["/sbin/tini", "--"]

USER 1001

CMD [ "bun", "src/index.ts" ]
