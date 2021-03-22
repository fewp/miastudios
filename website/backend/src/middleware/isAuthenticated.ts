import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";

// checking if the user is logged in
export const isAuthenticated: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("User is not authenticated");
  }

  return next();
};
