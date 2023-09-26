# docker hub bun uses debian
FROM oven/bun:1.0.3

RUN apt update && apt install tini

WORKDIR /app

COPY package.json /app/package.json
COPY bun.lockb /app/bun.lockb
COPY tsconfig.json /app/tsconfig.json

COPY src/ /app/src/

RUN bun install --production --frozen-lockfile

# tini increases shutdown reliability
# https://github.com/krallin/tini
ENTRYPOINT ["/usr/bin/tini", "--"]

CMD [ "bun", "src/index.ts" ]
