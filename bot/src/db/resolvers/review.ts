import { FunctionResponse } from "../../types";
import { Review } from "../entities/Review";

// creates one information row
export const createReview = async (
  client: string,
  manager: string,
  message: string,
  managerRating: number,
  buildersRating: number
): Promise<FunctionResponse> => {
  try {
    await Review.create({
      client: client,
      manager: manager,
      managerRating: managerRating,
      buildersRating: buildersRating,
      message: message,
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
