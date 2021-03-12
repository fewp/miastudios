import { FunctionResponse } from "../../types";
import { Information } from "../entities/Information";

// creates one information row
export const createInformation = async (
  userId: string,
  reactionId: string
): Promise<FunctionResponse> => {
  try {
    await Information.create({
      userId: userId,
      reactionId: reactionId,
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

// fetches all "information" rows from DB
export const getInformationArray = async (): Promise<Information[] | null> => {
  return await Information.find();
};

export const getInformationCount = async (
  reactionId: string
): Promise<number | null> => {
  return await Information.count({ where: { reactionId } });
};

// fetches a single "information" row from DB
export const getInformation = async (
  userId: string
): Promise<Information | null> => {
  return await Information.findOne({ where: { userId } });
};

// deletes a single "information" row from db
export const deleteInformation = async (id: number): Promise<boolean> => {
  await Information.delete(id);
  return true;
};
