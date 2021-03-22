import { FunctionResponse } from "../../types";
import { Ticket } from "../entities/Ticket";

// creates one information row
export const createTicket = async (
  owner: string,
  channelId: string,
  type: string
): Promise<FunctionResponse> => {
  try {
    await Ticket.create({
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

export const getTicketArray = async (): Promise<Ticket[] | null> => {
  return await Ticket.find();
};

export const getTicket = async (owner: string): Promise<Ticket | null> => {
  return await Ticket.findOne({ where: { owner } });
};

export const getTicketByChannelId = async (
  channelId: string
): Promise<Ticket | null> => {
  return await Ticket.findOne({ where: { channelId } });
};

export const deleteTicket = async (id: number): Promise<boolean> => {
  await Ticket.delete(id);
  return true;
};

export const updateTicket = async (
  id: number,
  type: string
): Promise<boolean> => {
  const ticket = await Ticket.findOne(id);

  // no ticket found with that id
  if (!ticket) return false;

  Ticket.update({ id }, { type });

  return true;
};
