import * as Discord from "discord.js";
import * as DiscordVoice from "@discordjs/voice";

export const exitVoiceChannel = (client: Discord.Client<boolean>): void => {
  client.on("messageCreate", async (message: Discord.Message<boolean>): Promise<void> => {
    if (message.author.bot || !(message.content === "!tsumugibye") || !message.guild)
      return;
    if (
      message.member?.voice.channel?.members
        .map((member: Discord.GuildMember): string => member.user.username)
        .includes(message.guild?.me?.user.username as string)
    ) {
      const channel: Discord.VoiceBasedChannel = message.member?.voice
        .channel as Discord.VoiceBasedChannel;
      const connection: DiscordVoice.VoiceConnection = DiscordVoice.joinVoiceChannel({
        adapterCreator: channel?.guild
          .voiceAdapterCreator as DiscordVoice.DiscordGatewayAdapterCreator,
        channelId: channel?.id as string,
        guildId: channel?.guild.id as string,
        selfDeaf: true,
        selfMute: false,
      });
      connection.destroy();
      message.reply("ばいばーい⭐️");
    }
  });
};
