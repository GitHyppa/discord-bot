const http = require("http");

const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }

  if (msg.content === "krilleHours?") {
    http.get(
      "http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=3F775626F7BAEB3A39B89D6B0BE239A7&steamid=76561198140275470&format=json",
      (response) => {
        const data = [];

        response
          .on("data", (d) => {
            data.push(d);
          })
          .on("end", function () {
            const buffer = Buffer.concat(data);
            const obj = JSON.parse(buffer.toString());
            const games = obj.response.games;
            const CSGO = games.find((game) => {
              return game.appid === 730;
            });

            if (CSGO === undefined) {
              msg.reply(
                "Krille has 0 minutes in CS:GO the last 2 weeks... WE MISS YOU! R.I.P"
              );
            } else {
              const hours = Math.round(CSGO.playtime_2weeks / 60);
              msg.reply(
                "Eyyy, what a chad! Krille has " +
                  hours +
                  " hours the last 2 weeks! A 100 more and we will be satisfied. What are you waiting for? GRIND YOU LITAL MANKY! "
              );
            }
          });

        return data;
      }
    );
  }
});

const listOfVictims = [
  // {
  //   name: "Hyppa",
  //   discordId: "224492987311194123",
  //   steamId: "76561198307307885",
  // },
  {
    name: "_troXi",
    discordId: "221276984485871617",
    steamId: "76561198337610676",
  },
  {
    name: "leqtic",
    discordId: "129978066700206080",
    steamId: "76561198140275470",
  },
  {
    name: "NYBERG",
    discordId: "150585994163388417",
    steamId: "76561198071807369",
  },
  {
    name: "Albraz",
    discordId: "799283759131787275",
    steamId: "76561198165702092",
  },
  {
    name: "K̵̲̔e̷͚̓r̸͌̉õ̷̟",
    discordId: "217321438586208256",
    steamId: "76561198201954793",
  },
  {
    name: "LNKZN",
    discordId: "219080043094081536",
    steamId: "76561198205682913",
  },
  {
    name: "wille",
    discordId: "241550939524169728",
    steamId: "76561198145075702",
  },
];

setInterval(async () => {
  listOfVictims.map((victim) => {
    http.get(
      `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=3F775626F7BAEB3A39B89D6B0BE239A7&steamid=${victim.steamId}&format=json`,
      (response) => {
        const data = [];

        response
          .on("data", (d) => {
            data.push(d);
          })
          .on("end", async function () {
            const channel = client.guilds.cache.get("794260109243973662");
            const person = await channel.members.fetch(victim.discordId);

            const buffer = Buffer.concat(data);
            const obj = JSON.parse(buffer.toString());

            if (!obj.response.games) {
              person.setNickname(`${victim.name} (private profile)`);
              return;
            }

            const games = obj.response.games;
            const CSGO = games.find((game) => {
              return game.appid === 730;
            });

            if (CSGO === undefined) {
              await person.setNickname(`${victim.name} (0h)`);
            } else {
              const hours = Math.round(CSGO.playtime_2weeks / 60);
              await person.setNickname(`${victim.name} (${hours}h)`);
            }
          });

        return data;
      }
    );
  });
}, 1000 * 60 * 60);

const listOfVictims2 = [
  {
    name: "Hyppa",
    discordId: "224492987311194123",
    steamId: "76561198307307885",
  },
  {
    name: "_troXi",
    discordId: "221276984485871617",
    steamId: "76561198337610676",
  },
  {
    name: "leqtic",
    discordId: "129978066700206080",
    steamId: "76561198140275470",
  },
  {
    name: "NYBERG",
    discordId: "150585994163388417",
    steamId: "76561198071807369",
  },
  {
    name: "Albraz",
    discordId: "799283759131787275",
    steamId: "76561198165702092",
  },
  {
    name: "K̵̲̔e̷͚̓r̸͌̉õ̷̟",
    discordId: "217321438586208256",
    steamId: "76561198201954793",
  },
  {
    name: "LNKZN",
    discordId: "219080043094081536",
    steamId: "76561198205682913",
  },
  {
    name: "wille",
    discordId: "241550939524169728",
    steamId: "76561198145075702",
  },
];

setInterval(async () => {
  const channelb = client.guilds.cache.get("794260109243973662");
  const textChannelb = channelb.channels.cache.get("909239468454727743");

  textChannelb.send(`HOURS IN CSGO LAST 2 WEEKS:`);

  listOfVictims2.map((victim) => {
    http.get(
      `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=3F775626F7BAEB3A39B89D6B0BE239A7&steamid=${victim.steamId}&format=json`,
      (response) => {
        const data = [];

        response
          .on("data", (d) => {
            data.push(d);
          })
          .on("end", async function () {
            const channel = client.guilds.cache.get("794260109243973662");
            const textChannel =
              channel.channels.cache.get("909239468454727743");

            const person = await channel.members.fetch(victim.discordId);

            const buffer = Buffer.concat(data);
            const obj = JSON.parse(buffer.toString());

            if (!obj.response.games) {
              textChannel.send(
                person.user.username + " - ? (private steam profile)"
              );

              return;
            }

            const games = obj.response.games;
            const CSGO = games.find((game) => {
              return game.appid === 730;
            });

            if (CSGO === undefined) {
              textChannel.send(person.user.username + " - 0");
            } else {
              const hours = Math.round(CSGO.playtime_2weeks / 60);
              textChannel.send(person.user.username + " - " + hours.toString());
            }
          });
      }
    );
  });
}, 1000 * 60 * 60 * 12);

client.login(process.env.TOKEN);
