import { CHECK_EMOJI, CROSS_EMOJI } from "../assets/Emojis";

export default (reaction: string): boolean => {
  switch (reaction) {
    case CHECK_EMOJI.id:
      return true;
    case CROSS_EMOJI.id:
      return false;
    default:
      return false;
  }
};
