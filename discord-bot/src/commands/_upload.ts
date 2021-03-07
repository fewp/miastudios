import { createInformation } from "../db/resolvers/information";
import { FunctionResponse } from "../types";

const old = require("../../old.json");

module.exports = {
  name: "upload",
  alias: "Data Upload",
  description: "Uploads old data from file",
  run(): FunctionResponse {
    console.log("old", old);
    console.log("old.length", old.length);
    old.forEach(async (item: any) => {
      const result = createInformation(item.user_id, item.reaction);
    });
    return {
      status: true,
      message: ["Old data uploaded to DB"],
    };
  },
};
