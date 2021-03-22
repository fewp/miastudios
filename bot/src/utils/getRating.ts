import {
  FIVE_EMOJI,
  FOUR_EMOJI,
  ONE_EMOJI,
  STAR_EMOJI,
  THREE_EMOJI,
  TWO_EMOJI,
} from "../assets/Emojis";

export default (reaction: string): any[] => {
  let rating: string = "";
  let num: number = 0;

  switch (reaction) {
    case ONE_EMOJI.id:
      rating = STAR_EMOJI.text;
      num = 1;
      break;
    case TWO_EMOJI.id:
      rating = `${STAR_EMOJI.text} `.repeat(2);
      num = 2;
      break;
    case THREE_EMOJI.id:
      rating = `${STAR_EMOJI.text} `.repeat(3);
      num = 3;
      break;
    case FOUR_EMOJI.id:
      rating = `${STAR_EMOJI.text} `.repeat(4);
      num = 4;
      break;
    case FIVE_EMOJI.id:
      rating = `${STAR_EMOJI.text} `.repeat(5);
      num = 5;
      break;
  }

  return [rating.trim(), num];
};
