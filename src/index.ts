import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { cron } from "@elysiajs/cron";
import { job } from "./job";

let currentIp: string | null = null;
let lastUpdated = new Date();

const port = process.env.PORT || 8700;

const cronPattern = process.env.CRON_PATTERN || "0 0 */1 * * *"; // hourly

function getPage() {
  const now = new Date();
  return `<html lang="en">
  <head>
      <title>cf ddns</title>
      <meta http-equiv="refresh" content="5; url=/?t=${now.getTime()}" />
  </head>
  <body>
  <h1>${currentIp ? currentIp : "not set yet"}</h1>
  <p>last updated ${lastUpdated}</p>
  <p>it's ${now.toISOString()}</p>
  <hr />
  <form method="post" action="/force-update">
    <button type="submit">force update</button>
  </form>
  </body>
</html>`;
}

new Elysia()
  .use(
    cron({
      name: "sync",
      pattern: cronPattern,
      run() {
        console.info(`🤖 cron job`);
        job((ip) => {
          currentIp = ip;
        })
          .then(() => {
            lastUpdated = new Date();
            console.info(
              `😺 cloudflare dns sync done - ${lastUpdated.toISOString()}`
            );
          })
          .catch((err) => {
            console.warn("🙀 cron job cloudflare dns sync error");
            console.error(err);
          });
      },
    })
  )
  .use(html())
  .get("/", () => getPage())
  .post("/force-update", async ({ set }) => {
    console.info(`👴 force update`);
    await job((ip) => {
      currentIp = ip;
    })
      .then(() => {
        lastUpdated = new Date();
        console.info(
          `😺 cloudflare dns sync done - ${lastUpdated.toISOString()}`
        );
        set.redirect = "/?force-update=successful";
      })
      .catch((err) => {
        console.warn("🙀 force update cloudflare dns sync error");
        console.error(err);
        set.redirect = "/?force-update=failure";
      });
  })
  .get("/health", () => ({ project: "cloudflare-dns-sync", time: Date.now() }))
  .listen(port, () => {
    console.info(
      `👋 cloudflare-dns-sync is listening at http://localhost:${port}`
    );
  });
