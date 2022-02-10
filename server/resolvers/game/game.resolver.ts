import { UserModel } from "../../models/User";
import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import {
  INVALID_GAME,
  INVALID_PLAYER,
  INVALID_TOKEN,
} from "../../utils/constants";
import { Expo } from "expo-server-sdk";
import { Game, GameModel, GameStatus } from "../../models/Game";
import {
  CreateGamePayload,
  UpdateGameArgs,
  UpdateGamePayload,
} from "./gameTypes";
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
    // 1. Get initiator and invitee
    const initiator = await UserModel.findById(ctx.user).lean();
    const invitee = await UserModel.findOne({ username });

    if (invitee?._id.toString() === initiator?._id.toString())
      return { problem: INVALID_PLAYER };
    const inviteeToken = invitee?.expoToken;
    if (!invitee || !inviteeToken) return { problem: INVALID_PLAYER };

    // 2. Create a new game
    const game = await GameModel.create({
      initiator: initiator?.username,
      invitee: invitee.username,
    });

    const expo = new Expo();

    // 3. Invite last device player logged in
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
            return { problem: INVALID_TOKEN };
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    return { data: game };
  }

  @Mutation(() => UpdateGamePayload)
  @UseMiddleware(isAuth)
  async updateGame(
    @Args() { gameId, gameOver, playerBoard }: UpdateGameArgs,
    @Ctx() ctx: Context
  ): Promise<UpdateGamePayload> {
    const game = await GameModel.findById(gameId);
    const user = await UserModel.findById(ctx.user).lean();

    if (!game || game.gameStatus === GameStatus.FINISHED)
      return { problem: INVALID_GAME };

    switch (user?.username) {
      case game.initiator:
        game.initiatorBoard = playerBoard;
        game.initiatorGameover = gameOver;
        break;
      case game.invitee:
        if (game.gameStatus === GameStatus.IDLE) {
          game.gameStatus = GameStatus.STARTED;
        }
        game.inviteeBoard = playerBoard;
        game.inviteeGameover = gameOver;
        break;
    }

    if (game.initiatorGameover) {
      game.gameStatus = GameStatus.FINISHED;
      game.winner = game.invitee;
    } else if (game.inviteeGameover) {
      game.gameStatus = GameStatus.FINISHED;
      game.winner = game.initiator;
    }

    await game.save();
    return { data: game };
  }

  @Query(() => Game)
  @UseMiddleware(isAuth)
  async game(@Arg("gameId") gameId: string): Promise<Game> {
    return await GameModel.findById(gameId).lean();
  }
}
