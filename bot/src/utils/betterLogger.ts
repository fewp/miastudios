import betterDate from "./betterDate";
import capitalize from "./capitalizeString";

export default (message: string) => {
  let tag = message.split("[").pop();
  tag = tag.split("]").shift();
  const msg = message.split("]").pop();

  const e = "\x1b[31m"; // red (for error messages)
  const b = "\x1b[34m"; // blue
  const c = "\x1b[1m"; // enhances brightness
  const r = "\x1b[0m"; // reset to default color (white)

  if (tag.toLowerCase() === "error")
    console.log(`${c}${c}[${tag}]${e}${capitalize(msg)}${r} - ${betterDate()}`);
  else
    console.log(`${c}${c}[${tag}]${b}${capitalize(msg)}${r} - ${betterDate()}`);
};
