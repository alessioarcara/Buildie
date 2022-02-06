import { UserModel } from "../../models/User";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import Context from "types/context";
import { isAuth } from "../../middlewares/isAuth";
import { Score, SubmitScorePayload } from "./leaderboardTypes";
import { USER_NOT_FOUND } from "../../utils/constants";

@Resolver()
export default class LeaderboardResolver {
  @Query(() => [Score], { nullable: true })
  async scores(): Promise<Score[]> {
    return await UserModel.find({ score: { $gt: 0 } })
      .sort({ score: -1 })
      .lean();
  }

  @Mutation(() => SubmitScorePayload)
  @UseMiddleware(isAuth)
  async submitScore(
    @Arg("score", () => Int) score: number,
    @Ctx() ctx: Context
  ): Promise<SubmitScorePayload> {
    const user = await UserModel.findByIdAndUpdate(
      ctx.user,
      { score },
      { new: true }
    );

    return user
      ? { data: { _id: user._id, username: user.username, score: user.score } }
      : { problem: USER_NOT_FOUND };
  }
}
