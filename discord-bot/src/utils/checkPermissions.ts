import { Guild, User } from "discord.js";
import { MANAGEMENT_ROLE_ID } from "../assets/Roles";

export default async (
  user: User,
  guild: Guild,
  permissions: string
): Promise<boolean> => {
  const member = await guild.members.cache.get(user.id);

  switch (permissions.toUpperCase()) {
    case "MANAGER":
      if (member.roles.cache.some((x) => x.id === MANAGEMENT_ROLE_ID))
        return true;
      else return false;
    case "TICKET OWNER":
      return true;
  }

  return false; // incorrect usage (neither MANAGER nor TICKET OWNER)
};
