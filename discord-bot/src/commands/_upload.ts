import { createInformation } from "../db/resolvers/information";
import { FunctionResponse } from "../types";

const old = require("../../old.json");

module.exports = {
  name: "Upload",
  alias: "Data Upload",
  description: "Uploads old data from file",
  permissionRequired: ["DEVELOPER"],
  argumentsSchema: null,
  isMultiWord: false,
  run(): FunctionResponse {
    old.forEach(async (item: any) => {
      const result = createInformation(item.user_id, item.reaction);
    });
    return {
      status: true,
      message: ["Old data uploaded to DB"],
    };
  },
};
