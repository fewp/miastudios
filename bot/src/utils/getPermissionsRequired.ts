import capitalize from "../utils/capitalizeString";

export default (permissions: string[]): string => {
  let permissionsRequired: string = "Permissions required: ";
  permissions.forEach((permissionName: string, index: number) => {
    if (permissionName === "TICKETOWNER")
      permissionsRequired += `**Ticket Owner** `;
    else
      permissionsRequired += `**${capitalize(
        permissionName.toLowerCase()
      )}** or `;

    if (index === permissions.length - 1) permissionsRequired.slice(0, -3);
  });
  return permissionsRequired.trim();
};
