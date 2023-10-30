export async function handleDiscordWebhook(newip: string) {
  const url = getDiscordWebhookUrl();
  if (!url) {
    console.warn("no discord webhook url set; cannot sent notification");
    return;
  }

  const payload = getPayload(newip);
  console.info(`💬 sending discord webhook`);
  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.info(`💬 sent discord webhook`);
  if (response.status !== 204) {
    console.warn(
      "🙊 discord complained about this wehbook and did not respond with 204"
    );
  }
}

function getDiscordWebhookUrl() {
  return process.env.DISCORD_WEBHOOK_URL;
}

function getPayload(newip: string) {
  const silly = [
    "Wow, how unusual. Did the power go out?",
    "Is your router running? You better go catch it.",
    "Try as you might, but you will never escape Cloudflare.",
    "Hello, is this thing on?",
    "One wrong move and you'll never connect to your precious server again...",
    "Finally, that old ip has been getting so stale.",
    "You were supposed to cut the red wire!",
    "Turns out, it's just random sometimes.",
    "For a second there, I thought Google discontinued the Internet.",
    "Introducing our brand new revolution product, network connectivity. Again.",
    "No, seriously, it's updated so you should go look.",
    "Sometimes when there's an update, I just don't tell anyone anyway.",
    "REDACTED. CLASSIFIED.",
  ];

  const randomIndex = Math.floor(Math.random() * silly.length);
  const randomSilly = silly[randomIndex];

  return {
    username: "Ryanbot",
    avatar_url: "https://i.imgur.com/4M34hi2.png",
    content:
      "👋 There's been a network infrastructure update.\n\nFor details on this script, visit [ryanmr/cf-ddns](https://github.com/ryanmr/cf-ddns).",
    embeds: [
      {
        author: {
          name: "Server",
          url: `https://ryanrampersad.com/?s=server&cloudflare&ip=${newip}&idx=${randomIndex}&t=${Date.now()}`,
          icon_url: "https://i.imgur.com/4M34hi2.png",
        },
        title: "IP Updated",
        url: `https://ryanrampersad.com/?s=ip&cloudflare&ip=${newip}&idx=${randomIndex}&t=${Date.now()}`,
        description: `New new ip is ${newip}`,
        color: 15258703,
        fields: [],
        footer: {
          text: randomSilly,
        },
      },
    ],
  };
}
