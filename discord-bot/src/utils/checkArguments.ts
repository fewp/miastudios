import { FunctionResponse } from "../types";
import checkIfValidUrl from "./checkIfValidUrl";
import cleanArray from "./cleanArray";

export default (
  args: string,
  schema: string[],
  isMultiWord: boolean
): string[] | FunctionResponse => {
  if (!args && schema !== null)
    return {
      status: false,
      message: ["No arguments provided."],
    };

  if (isMultiWord === true) {
    const argsCount: number = schema.length;

    const numberOfArgsReceived: string[] = args.match(/"/g);
    if (!numberOfArgsReceived)
      return {
        status: false,
        message: ["Incorrect usage, no argument separators provided"],
      };

    if (numberOfArgsReceived.length != argsCount * 2)
      return {
        status: false,
        message: ["Invalid number of arguments."],
      };

    let argsArray: string[] = args.split(`"`);
    argsArray = cleanArray(argsArray);

    let requiresUrl: boolean = false;
    let isUrlValid: boolean = false;

    // checks if the schema requires an URL
    // also checks if the URL is valid, if it is not valid, it will return false;
    schema.forEach((el: string, i: number) => {
      if (el.charAt(0) == "*") {
        requiresUrl = true;
        isUrlValid = checkIfValidUrl(argsArray[i]);
      }
    });

    // returns the valid arguments
    if (requiresUrl && isUrlValid) return argsArray;
    // doesn't require an url, but the args are still valid
    else if (!requiresUrl) return argsArray;
    else
      return {
        status: false,
        message: ["URL Required in the arguments"],
      };
  } else {
    let argsArray: string[] = args.split(` `);
    if (argsArray.length > 1)
      return {
        status: false,
        message: ["Invalid number of arguments"],
      };
  }
  return {
    status: true,
    message: null,
  };
};
