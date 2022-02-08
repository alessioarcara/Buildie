import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import {
  AuthenticatePayload,
  AuthData,
  SignupInput,
  SigninInput,
} from "./userTypes";
import { User, UserModel } from "../../models/User";
import { compare } from "bcryptjs";
import { createTokens, decodeRefreshToken } from "../../utils/auth";
import { AuthenticationError } from "apollo-server-express";
import {
  INVALID_REFRESH_TOKEN,
  USER_NOT_FOUND,
  INVALID_PASSWORD,
  EMAIL_EXISTS,
} from "../../utils/constants";
import Context from "types/context";
import { isAuth } from "../../middlewares/isAuth";

@Resolver()
export default class UserResolver {
  @Mutation(() => AuthenticatePayload)
  async signup(@Arg("input") input: SignupInput): Promise<AuthenticatePayload> {
    const existingUser = await UserModel.findOne({ email: input.email }).lean();
    if (existingUser) return { problem: EMAIL_EXISTS };

    const user = await UserModel.create(input);

    return {
      data: { userId: user.id, ...createTokens(user._id, user.count) },
    };
  }

  @Mutation(() => AuthenticatePayload)
  async signin(
    @Arg("input") { email, password }: SigninInput
  ): Promise<AuthenticatePayload> {
    const user = await UserModel.findOne({ email }).lean();
    if (!user) return { problem: USER_NOT_FOUND };

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

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() ctx: Context): Promise<User> {
    return await UserModel.findById(ctx.user).lean();
  }
}
