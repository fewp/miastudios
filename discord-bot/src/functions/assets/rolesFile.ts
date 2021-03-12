// import log from "../../utils/betterLogger";

import { ROLE_NAMES } from "../../assets/required/RoleNames";

export default async (guild: any): Promise<string> => {
  let rolesContent: string = `export const EVERYONE_ROLE_ID: string = "${guild.id}";\n`;
  await guild.roles.cache.forEach((role: any) => {
    ROLE_NAMES.forEach((roleName: string) => {
      if (role.name.toLowerCase().includes(roleName.toLowerCase()))
        rolesContent += `export const ${roleName.toUpperCase()}_ROLE_ID: string = "${
          role.id
        }"; // ${role.name}\n`;
    });
  });

  return rolesContent;
};
