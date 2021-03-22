import { FunctionResponse } from "../../types";
import { OldTicket } from "../entities/OldTicket";

// creates one information row
export const createOldTicket = async (
  owner: string,
  channelId: string,
  type: string
): Promise<FunctionResponse> => {
  try {
    await OldTicket.create({
      owner: owner,
      type: type,
      channelId: channelId,
    }).save();
    return {
      status: true,
      message: null,
    };
  } catch (error) {
    return {
      status: false,
      message: [error],
    };
  }
};

export const getOldTicketArray = async (): Promise<OldTicket[] | null> => {
  return await OldTicket.find();
};

export const getOldTicket = async (
  owner: string
): Promise<OldTicket | null> => {
  return await OldTicket.findOne({ where: { owner } });
};

export const deleteOldTicket = async (id: number): Promise<boolean> => {
  await OldTicket.delete(id);
  return true;
};
