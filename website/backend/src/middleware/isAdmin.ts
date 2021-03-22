import { MiddlewareFn } from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";

// checking if the user is an admin or not
export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("User is not authenticated");
  }

  const user = await User.findOne(context.req.session.userId);
  console.log("user", user);
  if (user && !user.isAdmin) {
    throw new Error("Reserved to admins only");
  }

  return next();
};
