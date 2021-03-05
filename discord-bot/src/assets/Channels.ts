// channels for testing / sending commands in production
export const COMMAND_CHANNELS: string[] = [
  "796639758351990815",
  "695048347559395408",
];
export const INFORMATION_MIRROR_CHANNEL: string = "793157907780075551"; // only accessible to staff, used to be called where_from_mirror

// regular text channels, accessible for everyone
export const WELCOME_CHANNEL: string = "692576625803526247";
export const ANNOUNCEMENTS_CHANNEL: string = "694526793482240020";
export const SHOWCASE_CHANNEL: string = "694739190222684212";
export const STORE_CHANNEL: string = "694739177773989908";
export const REVIEWS_CHANNEL: string = "694740873250078730";
export const TERMS_OF_SERVICE_CHANNEL: string = "694702418579030037";
export const TICKET_CHANNEL: string = "694720734441766982";
export const PRIORITY_TICKET_CHANNEL: string = "694720746773151745"; // only accessible to staff and priority clients
export const INFORMATION_CHANNEL: string = "694607784922185878"; // used to be called where_from
export const SOCIAL_MEDIA_CHANNEL: string = "797623889635049472";

// special channels
export const MEMBER_COUNT_CHANNEL: string = "694526083483303949";

// parent channels (categories)
export const COMMISSION_TICKET_PARENT_CHANNEL: string = "694738185896591470";
export const SUPPORT_TICKET_PARENT_CHANNEL: string = "695738015481462824";
export const APPLICATION_TICKET_PARENT_CHANNEL: string = "695738076235825163";
export const PRIORITY_COMMISSION_TICKET_PARENT_CHANNEL: string =
  "694738303957860363";
export const PRIORITY_SUPPORT_TICKET_PARENT_CHANNEL: string =
  "695963428119904296";

export const REACTION_MESSAGE_CHANNELS_ARRAY: string[] = [
  TERMS_OF_SERVICE_CHANNEL,
  TICKET_CHANNEL,
  PRIORITY_TICKET_CHANNEL,
  INFORMATION_CHANNEL,
];
