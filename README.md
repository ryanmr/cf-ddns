# cloudflare-dns-sync

> sync home ip

👉 **What is the story here?**

I have gigabit symmetric fiber connectivity at home. I have noticed occasionally that what I thought was an statically allocated ip address was in fact not. The ip address would change after a full power outage cycled all the networking infrastructure (router, network router, optical network terminal (ont)).

My router supports [other ddns](https://www.google.com/search?q=ddns) vendors but apparently not Cloudflare (where most of my domain names are kept). There are a few existing open source community options, but after having tried those, and none working well, I wanted to [rebuild my own](https://github.com/ryanmr?tab=repositories&q=ddns&type=&language=&sort=) like the good old days.

This time, with a new stack with glitz and glamour, using [bun](https://bun.sh/) and [elysia](https://elysiajs.com/). Is this a setup for futuristic regret? Yes! Is this an experiment and an experience builder? Yes! Is this a way to pad a resume for almost certainly and definitely no reason? Yes! Is this fun? Yes!

## Tech

- [bun](https://bun.sh/)
- [cloudflare](https://developers.cloudflare.com/api/)
- [ifconfig.co](https://ifconfig.co/)
- [elysia](https://elysiajs.com/)

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
bun run src/index.ts
```

## Environment variables

Remember to set your environment variables:

```sh
CLOUDFLARE_ACCESS_TOKEN=...
CLOUDFLARE_RECORD_NAME...
CLOUDFLARE_ZONE_ID=...
```

Optionally, there's a [Discord webhook](https://discord.com/developers/docs/resources/webhook):

```
DISCORD_WEBHOOK_URL=...
```

