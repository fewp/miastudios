import { MEMBER_COUNT_CHANNEL } from "../assets/Channels";
import { FunctionResponse } from "../types";
import log from "../utils/betterLogger";

export default async (guild: any): Promise<FunctionResponse> => {
  try {
    log(`[FUNCTION USED] Counter`);
    guild.channels.cache
      .get(MEMBER_COUNT_CHANNEL)
      .setName(`﹝👥﹞Members: ${guild.memberCount}`);
  } catch (error) {
    log(`[ERROR] ${error}`);
    return {
      status: false,
      message: [error],
    };
  }
  return {
    status: true,
    message: null,
  };
};
