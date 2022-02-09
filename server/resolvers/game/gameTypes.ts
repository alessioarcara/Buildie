import { MutationPayload } from "../genericTypes";
import { Field, ID, Int, ObjectType } from "type-graphql";

@ObjectType()
export class GameData {
  @Field(() => ID)
  gameId: string;
  @Field(() => [Int])
  initiatorState: number[];
  @Field(() => [Int])
  inviteeState: number[];
}

@ObjectType()
export class CreateGamePayload extends MutationPayload(GameData) {}
