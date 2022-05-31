import "dotenv/config";
import { Readable } from "stream";
import * as Voicevox from "voicevox-api-client";

const createVoice = async (data: { text: string; speaker: number }): Promise<Readable> => {
  const client: Voicevox.Client = new Voicevox.Client(
    process.env.VOICEVOX_ENGINE_URL as string
  );
  try {
    const query: Voicevox.Query = await client.query.createQuery(data.speaker, data.text);
    const voice: ArrayBuffer = await client.voice.createVoice(data.speaker, query);
    const buf: Buffer = Buffer.from(voice);
    const stream: Readable = new Readable();
    stream.push(buf);
    stream.push(null);
    return stream;
  } catch (e: unknown) {
    throw e as Error;
  }
};

export default createVoice;
