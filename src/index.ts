import "dotenv/config";
import * as Discord from "discord.js";
import * as actions from "actions";
import * as commands from "commands";

const client: Discord.Client<boolean> = new Discord.Client({
  intents: Object.keys(Discord.Intents.FLAGS) as Discord.BitFieldResolvable<
    Discord.IntentsString,
    number
  >,
});

actions.speakVoiceChannel(client);
commands.joinVoiceChannel(client);
commands.exitVoiceChannel(client);

client.login(process.env.DISCORD_BOT_TOKEN as string);
