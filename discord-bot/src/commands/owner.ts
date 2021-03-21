import {
  APPLICATIONS_PARENT_CHANNEL,
  NORMAL_COMMISSIONS_PARENT_CHANNEL,
  NORMAL_SUPPORT_PARENT_CHANNEL,
  PRIORITY_SUPPORT_PARENT_CHANNEL,
  PRIORITY_TICKETS_PARENT_CHANNEL,
} from "../assets/Channels";
import { createTicket } from "../db/resolvers/ticket";
import { FunctionResponse } from "../types";

module.exports = {
  name: "owner",
  alias: "Set owner",
  description: "Adds old ticket to database, setting an owner",
  permissionRequired: ["MANAGER", "DEVELOPER"],
  argumentsSchema: ["<@User>"],
  isMultiWord: false, // if the arguments need to be separated by ""
  async run(msg: any, args: string): Promise<FunctionResponse> {
    let type: string = "";
    const channelId: string = msg.channel.id;
    const owner = args.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    switch (msg.channel.parentID) {
      case PRIORITY_SUPPORT_PARENT_CHANNEL:
        type = "Priority Support";
        break;
      case NORMAL_SUPPORT_PARENT_CHANNEL:
        type = "Support";
        break;
      case APPLICATIONS_PARENT_CHANNEL:
        type = "Application";
        break;
      case NORMAL_COMMISSIONS_PARENT_CHANNEL:
        type = "Commission";
        break;
      case PRIORITY_TICKETS_PARENT_CHANNEL:
        type = "Priority Commission";
        break;
    }

    await createTicket(owner, channelId, type);

    return {
      status: true,
      message: null,
    };
  },
};
