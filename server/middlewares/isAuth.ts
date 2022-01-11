import { AuthenticationError } from "apollo-server-express";
import { MiddlewareFn } from "type-graphql";
import Context from "../types/context";
import { verify } from "jsonwebtoken";
import { INVALID_ACCESS_TOKEN } from "../utils/constants";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const authHeader = context.req.get("Authorization"); // [Authorization]: Bearer token
  if (!authHeader) throw new AuthenticationError(INVALID_ACCESS_TOKEN);

  const token = authHeader.split(" ")[1]; // Bearer token
  if (!token || token === "")
    throw new AuthenticationError(INVALID_ACCESS_TOKEN);

  let decodedToken;
  try {
    decodedToken = verify(token, process.env.ACCESS_TOKEN_KEY!);
  } catch (err) {
    throw new AuthenticationError(INVALID_ACCESS_TOKEN);
  }
  if (!decodedToken) throw new AuthenticationError(INVALID_ACCESS_TOKEN);

  context.user = (decodedToken as any).userId;
  return next();
};
