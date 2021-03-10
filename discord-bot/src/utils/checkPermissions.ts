import { Guild, User } from "discord.js";
import { MANAGEMENT_ROLE_ID } from "../assets/Roles";

export default async (user: User, guild: Guild): Promise<boolean> => {
  const member = await guild.members.cache.get(user.id);

  if (member.roles.cache.some((x) => x.id === MANAGEMENT_ROLE_ID)) return true;
  else return false;
};
