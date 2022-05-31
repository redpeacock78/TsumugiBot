import * as Discord from "discord.js";
import * as DiscordVoice from "@discordjs/voice";

export const joinVoiceChannel = (client: Discord.Client<boolean>): void => {
  client.on("messageCreate", async (message: Discord.Message<boolean>): Promise<void> => {
    if (message.author.bot || !(message.content === "!tsumugijoin") || !message.guild)
      return;
    const channel: Discord.VoiceBasedChannel = message.member?.voice
      .channel as Discord.VoiceBasedChannel;
    if (
      !message.member?.voice.channel?.members
        .map((member: Discord.GuildMember): string => member.user.username)
        .includes(message.guild?.me?.user.username as string)
    ) {
      if (!channel) message.reply("ボイスチャンネルに参加してから呼んでね⭐️");
      if (channel) {
        DiscordVoice.joinVoiceChannel({
          adapterCreator: channel?.guild
            .voiceAdapterCreator as DiscordVoice.DiscordGatewayAdapterCreator,
          channelId: channel?.id as string,
          guildId: channel?.guild.id as string,
          selfDeaf: true,
          selfMute: false,
        });
        message.reply("入ったよ〜");
      }
    }
  });
};
