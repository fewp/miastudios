import { getInformationCount } from "../db/resolvers/information";
import { FunctionResponse } from "../types";

module.exports = {
  name: "test",
  description: "Sends an announcement to the #announcements channel",
  permissionRequired: "MANAGER",
  argumentsSchema: null,
  isMultiWord: false, // if the arguments need to be separated by ""
  async run(msg: any): Promise<FunctionResponse> {
    await getInformationCount("796646516172521472");

    return {
      status: true,
      message: null,
    };
  },
};
