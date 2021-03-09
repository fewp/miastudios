// channels for testing / sending commands in production
export const COMMAND_CHANNELS: string[] = [
  "796639758351990815",
  "695048347559395408",
  "818620412107816967",
];
export const INFORMATION_MIRROR_CHANNEL: string = "818620412107816966"; // only accessible to staff, used to be called where_from_mirror

// special channels
export const MEMBER_COUNT_CHANNEL: string = "818620411423490090";

// regular text channels, accessible for everyone
export const WELCOME_CHANNEL: string = "818620411423490092";
export const ANNOUNCEMENTS_CHANNEL: string = "818620411423490093";
export const INFORMATION_CHANNEL: string = "694607784922185878"; // used to be called where_from
export const TERMS_OF_SERVICE_CHANNEL: string = "818620411423490095";
export const STORE_CHANNEL: string = "818620411423490096";
export const SOCIAL_MEDIA_CHANNEL: string = "818637664781336596";
export const SHOWCASE_CHANNEL: string = "818620411423490097";
export const REVIEWS_CHANNEL: string = "818620411616165909";

// ticket channels
export const TICKET_CHANNEL: string = "818620411616165911";
export const PRIORITY_TICKET_CHANNEL: string = "818620411616165912"; // only accessible to staff and priority clients

// parent channels (categories)
export const COMMISSION_TICKET_PARENT_CHANNEL: string = "818620411616165913";
export const SUPPORT_TICKET_PARENT_CHANNEL: string = "818620411814084626";
export const APPLICATION_TICKET_PARENT_CHANNEL: string = "818620411814084627";
export const PRIORITY_COMMISSION_TICKET_PARENT_CHANNEL: string =
  "818620411956035647";
export const PRIORITY_SUPPORT_TICKET_PARENT_CHANNEL: string =
  "818620411956035652";

export const REACTION_MESSAGE_CHANNELS_ARRAY: string[] = [
  TERMS_OF_SERVICE_CHANNEL,
  TICKET_CHANNEL,
  PRIORITY_TICKET_CHANNEL,
  INFORMATION_CHANNEL,
];
