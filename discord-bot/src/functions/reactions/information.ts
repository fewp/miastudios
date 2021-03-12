import { Guild, GuildMember, TextChannel } from "discord.js";
import { INFORMATION_MIRROR_CHANNEL } from "../../assets/Channels";
import {
  INVITED_EMOJI,
  OTHER_EMOJI,
  TWITTER_EMOJI,
  YOUTUBE_EMOJI,
} from "../../assets/Emojis";
import {
  INFORMATION_MESSAGE,
  INFORMATION_MIRROR_MESSAGE,
} from "../../assets/Messages";
import {
  createInformation,
  deleteInformation,
  getInformation,
  getInformationCount,
} from "../../db/resolvers/information";
import { FunctionResponse } from "../../types";
import buildEmbed from "../../utils/buildEmbed";

module.exports = {
  name: "Information",
  description: "Gets information on how users found the server",
  message: INFORMATION_MESSAGE,
  async run(
    member: GuildMember,
    guild: Guild,
    reaction: any
  ): Promise<FunctionResponse> {
    const reactionId = reaction._emoji.id;

    // check if user is in db already
    const response = await getInformation(member.id);
    if (response) {
      // deletes information so a new one can be added
      await deleteInformation(response.id);
    }

    // adds reaction to db
    try {
      createInformation(member.id, reactionId);
    } catch (error) {
      return {
        status: false,
        message: error,
      };
    }

    // counters
    const invitedCount: number = await getInformationCount(INVITED_EMOJI.id);
    const twitterCount: number = await getInformationCount(TWITTER_EMOJI.id);
    const youtubeCount: number = await getInformationCount(YOUTUBE_EMOJI.id);
    const otherCount: number = await getInformationCount(OTHER_EMOJI.id);

    const box = "`"; // util for code in embeds
    // text for embed
    const text = `${INVITED_EMOJI.text} ${box} INVITED  ${box} | **${invitedCount}** 
        ${TWITTER_EMOJI.text} ${box} TWITTER  ${box} | **${twitterCount}** 
        ${YOUTUBE_EMOJI.text} ${box} YOUTUBE  ${box} | **${youtubeCount}** 
        ${OTHER_EMOJI.text} ${box} OTHER    ${box} | **${otherCount}**`;

    const embed = buildEmbed(
      "Where did you find us?",
      text,
      null,
      this.name,
      true
    );

    // channel available for admins only
    // they can see the information there
    const mirrorChannel = await guild.channels.cache.get(
      INFORMATION_MIRROR_CHANNEL
    );

    // edit old message with updated data
    await (mirrorChannel as TextChannel).messages
      .fetch({
        around: INFORMATION_MIRROR_MESSAGE,
        limit: 1,
      })
      .then(async (messages) => {
        const oldMessage = await messages.first();
        oldMessage.edit(embed);
      });

    return {
      status: true,
      message: ["Test ran successfully"],
    };
  },
};
