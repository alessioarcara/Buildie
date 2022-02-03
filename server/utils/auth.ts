import { AuthenticationError } from "apollo-server-express";
import { sign, verify } from "jsonwebtoken";
import { RefreshTokenPayload } from "../types/token";
import { INVALID_REFRESH_TOKEN } from "./constants";

const ACCESS_EXPIRE_TIME = "1m"; // in minutes
const REFRESH_EXPIRE_TIME = "7d"; // in days

export const createTokens = (userId: string, count: number) => {
  const accessToken = sign({ userId }, process.env.ACCESS_TOKEN_KEY!, {
    expiresIn: ACCESS_EXPIRE_TIME,
  });
  const refreshToken = sign({ userId, count }, process.env.REFRESH_TOKEN_KEY!, {
    expiresIn: REFRESH_EXPIRE_TIME,
  });

  const expirationTime = parseInt(ACCESS_EXPIRE_TIME) * 60;
  return { accessToken, expires: expirationTime, refreshToken };
};

export const decodeRefreshToken = (refreshToken: string) => {
  if (!refreshToken || refreshToken === "")
    throw new AuthenticationError(INVALID_REFRESH_TOKEN);

  let decodedToken;
  try {
    decodedToken = verify(refreshToken, process.env.REFRESH_TOKEN_KEY!);
  } catch (err) {
    throw new AuthenticationError(INVALID_REFRESH_TOKEN);
  }

  return decodedToken as RefreshTokenPayload;
};
