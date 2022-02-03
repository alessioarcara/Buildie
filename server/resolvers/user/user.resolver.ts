import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { AuthenticatePayload, AuthenticateInput, AuthData } from "./userTypes";
import { UserModel } from "../../models/User";
import { compare } from "bcryptjs";
import { isAuth } from "../../middlewares/isAuth";
import { createTokens, decodeRefreshToken } from "../../utils/auth";
import { AuthenticationError } from "apollo-server-express";
import {
  INVALID_REFRESH_TOKEN,
  EMAIL_NOT_FOUND,
  INVALID_PASSWORD,
  EMAIL_EXISTS,
} from "../../utils/constants";

@Resolver()
export default class UserResolver {
  @Mutation(() => AuthenticatePayload)
  async signup(
    @Arg("input") input: AuthenticateInput
  ): Promise<AuthenticatePayload> {
    const existingUser = await UserModel.findOne({ email: input.email }).lean();
    if (existingUser) return { problem: EMAIL_EXISTS };

    const user = await UserModel.create(input);

    return {
      data: { userId: user.id, ...createTokens(user._id, user.count) },
    };
  }

  @Mutation(() => AuthenticatePayload)
  async signin(
    @Arg("input") { email, password }: AuthenticateInput
  ): Promise<AuthenticatePayload> {
    const user = await UserModel.findOne({ email }).lean();
    if (!user) return { problem: EMAIL_NOT_FOUND };

    const valid = await compare(password, user.password);
    if (!valid) return { problem: INVALID_PASSWORD };

    return {
      data: { userId: user._id, ...createTokens(user._id, user.count) },
    };
  }

  @Mutation(() => AuthData)
  async refreshToken(
    @Arg("refreshToken") refreshToken: string
  ): Promise<AuthData> {
    const decodedToken = decodeRefreshToken(refreshToken);

    const user = await UserModel.findById(decodedToken.userId);
    if (!user || user.count !== decodedToken.count)
      throw new AuthenticationError(INVALID_REFRESH_TOKEN);

    user.count += 1;
    await user.save();

    return { userId: user._id, ...createTokens(user._id, user.count) };
  }

  @Mutation(() => Boolean)
  async invalidateRefreshToken(
    @Arg("refreshToken") refreshToken: string
  ): Promise<Boolean> {
    const decodedToken = decodeRefreshToken(refreshToken);

    const user = await UserModel.findById(decodedToken.userId);
    if (!user) return false;

    user.count += 1;
    await user.save();

    return true;
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  async helloWorld() {
    console.log("EH BEH ECCOMI");
    return "Ciao Mondo";
  }
}
