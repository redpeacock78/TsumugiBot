import * as Discord from "discord.js";
import * as DiscordVoice from "@discordjs/voice";
import createVoice from "../libs/createVoice";

export const speakVoiceChannel = (client: Discord.Client<boolean>): void => {
  client.on("messageCreate", async (message: Discord.Message<boolean>): Promise<void> => {
    const channel: Discord.VoiceBasedChannel = message.member?.voice
      .channel as Discord.VoiceBasedChannel;
    if (
      message.author.bot ||
      message.content === "!tsumugijoin" ||
      message.content === "!tsumugibye"
    )
      return;
    const connection: DiscordVoice.VoiceConnection = DiscordVoice.joinVoiceChannel({
      adapterCreator: channel?.guild.voiceAdapterCreator as any,
      channelId: channel?.id as string,
      guildId: channel?.guild.id as string,
      selfDeaf: true,
      selfMute: false,
    });
    const player: DiscordVoice.AudioPlayer = DiscordVoice.createAudioPlayer();
    connection.subscribe(player);
    await createVoice({
      text: message.content,
      speaker: 8,
    })
      .then(async (stream): Promise<void> => {
        const resource: DiscordVoice.AudioResource<null> = DiscordVoice.createAudioResource(
          stream,
          {
            inputType: DiscordVoice.StreamType.Arbitrary,
          }
        );
        player.play(resource);
      })
      .catch(
        (): Promise<Discord.Message<boolean>> =>
          message.reply(
            "読み上げに失敗しちゃった〜\nもう少し短めの文章にしてみるか少し時間をおいてみてね⭐️"
          )
      );
  });
};
