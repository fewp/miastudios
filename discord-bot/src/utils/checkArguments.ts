import { FunctionResponse } from "../types";
import checkIfValidUrl from "./checkIfValidUrl";
import cleanArray from "./cleanArray";

export default (
  args: string,
  schema: string[],
  isMultiWord: boolean
): string[] | FunctionResponse => {
  if (isMultiWord === true) {
    const argsCount: number = schema.length;

    if (args.match(/"/g).length != argsCount * 2)
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
  }

  return [""];
};
