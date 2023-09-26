# cloudflare-dns-sync

> sync home ip

## Tech

- bun
- cloudflare
- ifconfig.co
- elysia

## Cutting edge user interface

![cutting edge user interface with plain html](./docs/assets/001-example-ui.png)

This uses revolutionary cutting edge user interface patterns. I mean, it uses no client side JavaScript, uses a form for interaction and uses meta tag refreshes for realtime-ish user experience.

## Usage

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.1 but then when upgraded v1.0.3, bun broken on my system. So now it just runs in docker only, which is fine until I can upgrade my system. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

### Docker

I recommend using `docker compose` now for this.

Be sure to copy `docker-compose.env.sample` into `docker-compose.env` and set your values accordingly. Then run:

```
docker compose up --build
```
