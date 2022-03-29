import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Player } from "./Player";

export enum GameStatus {
  IDLE = "IDLE",
  STARTED = "STARTED",
  FINISHED = "FINISHED",
}

registerEnumType(GameStatus, {
  name: "GameStatus",
  description: "The game status",
});

@ObjectType({ description: "The game model", simpleResolvers: true })
export class Game {
  @Field(() => ID)
  _id: string;

  @Field(() => GameStatus)
  @prop({ enum: GameStatus, default: GameStatus.IDLE })
  gameStatus: GameStatus;

  @Field(() => [Player])
  @prop({ type: () => Player })
  players: Player[];

  @Field({ nullable: true })
  @prop()
  winner: string;
}

export const GameModel = getModelForClass(Game);
