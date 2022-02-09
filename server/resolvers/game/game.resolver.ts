import { UserModel } from "../../models/User";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { INVALID_PLAYER } from "../../utils/constants";
import { Expo } from "expo-server-sdk";
import { GameModel } from "../../models/Game";
import { CreateGamePayload } from "./gameTypes";
import { isAuth } from "../../middlewares/isAuth";
import Context from "../../types/context";

@Resolver()
export default class GameResolver {
  @Mutation(() => CreateGamePayload)
  @UseMiddleware(isAuth)
  async createGame(
    @Arg("username") username: string,
    @Ctx() ctx: Context
  ): Promise<CreateGamePayload> {
    const initiator = await UserModel.findById(ctx.user).lean();
    const invitee = await UserModel.findOne({ username });

    if (invitee?._id.toString() === initiator?._id.toString())
      return { problem: INVALID_PLAYER };
    const inviteeToken = invitee?.expoToken;
    if (!invitee || !inviteeToken) return { problem: INVALID_PLAYER };

    const game = new GameModel();
    await game.save();

    const expo = new Expo();

    // last device logged in
    const messages = [
      {
        to: inviteeToken,
        body: `${initiator?.username} invited you to play a game!`,
        data: { gameId: game._id },
      },
    ];

    let chunks = expo.chunkPushNotifications(messages);

    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        for (let i = 0; i < ticketChunk.length; i += 1) {
          const ticket = ticketChunk[i];
          if (ticket.status === "error") {
            invitee.expoToken = undefined;
            return { problem: "Can't send notification to that player" };
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    return {
      data: {
        gameId: game._id,
        initiatorState: [],
        inviteeState: [],
      },
    };
  }
}
