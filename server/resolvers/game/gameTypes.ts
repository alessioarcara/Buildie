import { MutationPayload } from "../genericTypes";
import { ArgsType, Field, ID, Int, ObjectType } from "type-graphql";
import { Game } from "../../models/Game";

@ArgsType()
export class UpdateGameArgs {
  @Field(() => ID)
  gameId: string;

  @Field()
  gameOver: boolean;

  @Field(() => [Int])
  playerBoard: number[];
}

@ObjectType()
export class CreateGamePayload extends MutationPayload(Game) {}

@ObjectType()
export class UpdateGamePayload extends MutationPayload(Game) {}
