import { User } from "discord.js";
import { MANAGEMENT_ROLE_ID } from "../assets/Roles";
import { DEVELOPERS } from "../assets/Users";
import { getTicket } from "../db/resolvers/ticket";
import { FunctionResponse } from "../types";

export default async (
  user: User,
  msg: any,
  permissions: string[] | null
): Promise<FunctionResponse> => {
  if (!permissions)
    return {
      status: true,
      message: null,
    }; // no special permissions required

  const member = await msg.guild.members.cache.get(user.id);

  const hasPermissions = new Promise(async (resolve, _reject) => {
    permissions.forEach(async (permissionName: string, index: number) => {
      switch (permissionName.toUpperCase()) {
        case "MANAGER":
          if (member.roles.cache.some((x: any) => x.id === MANAGEMENT_ROLE_ID))
            return resolve(true);
          break;
        case "TICKETOWNER":
          const ticket = await getTicket(user.id);
          if (ticket)
            if (ticket.channelId === msg.channel.id) return resolve(true);
          break;
        case "DEVELOPER":
          if (DEVELOPERS.includes(user.id)) return resolve(true);
          break;
      }
      if (index === permissions.length - 1) return resolve(false);
    });
  });

  const result = await hasPermissions.then(
    (value): FunctionResponse => {
      switch (value) {
        case true:
          return {
            status: true,
            message: null,
          };
      }
      return {
        status: false,
        message: ["User has no permissions"],
      };
    }
  );

  return result;

  // switch (permissions.toUpperCase()) {
  //   case "MANAGER":
  //     if (member.roles.cache.some((x) => x.id === MANAGEMENT_ROLE_ID))
  //       return true;
  //     else return false;
  //   case "TICKETOWNER":
  //     return true;
  // }
};
