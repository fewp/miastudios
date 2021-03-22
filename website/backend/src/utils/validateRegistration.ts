import { UsernamePasswordInput } from "./UsernamePasswordInput";

export const validateRegistration = (options: UsernamePasswordInput) => {
  let name = options.username.replace(/[^a-zA-Z0-9]/g, "");

  if (name !== options.username) {
    return [
      {
        field: "username",
        message: "Username contains invalid characters",
      },
    ];
  }

  return null;
};
