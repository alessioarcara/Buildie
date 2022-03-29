import { UserModel } from "../../models/User";
import {
  Arg,
  Args,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
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
// import { PlayerModel } from "../../models/Player";

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
      players: [{ user: initiator?._id }, { user: invitee._id }],
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
    @Ctx() ctx: Context,
    @PubSub() pubSub: PubSubEngine
  ): Promise<UpdateGamePayload> {
    const game = await GameModel.findById(gameId);

    if (!game || game.gameStatus === GameStatus.FINISHED)
      return { problem: INVALID_GAME };

    const player = game.players.find(
      (player) => player.user?.toString() === ctx.user
    );

    if (player) {
      if (game.gameStatus === GameStatus.IDLE) player.isReady = true;
      player.board = playerBoard;
      player.gameover = gameOver;
    }

    if (
      game.gameStatus === GameStatus.IDLE &&
      game.players.every((player) => player.isReady)
    ) {
      game.gameStatus = GameStatus.STARTED;
    } else if (game.gameStatus === GameStatus.STARTED) {
      const survivingPlayers = game.players.filter(
        (player) => !player.gameover
      );
      if (survivingPlayers.length === 1) {
        game.gameStatus = GameStatus.FINISHED;
        game.winner = survivingPlayers[0].user!.toString();
      }
    }

    await game.save();
    await pubSub.publish(gameId, {
      _id: game._id,
      gameStatus: game.gameStatus,
      players: game.players,
      winner: game.winner,
    });

    return { data: game };
  }

  @Query(() => Game)
  async game(@Arg("gameId") gameId: string): Promise<Game> {
    return await GameModel.findById(gameId).lean();
  }

  @Subscription({ topics: ({ args }) => args.gameId })
  gameUpdate(@Arg("gameId") _: string, @Root() game: Game): Game {
    return game;
  }
}
