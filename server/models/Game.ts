import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";

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

  @prop({ required: true })
  initiator: string;

  @prop({ required: true })
  invitee: string;

  @Field()
  @prop({ default: false })
  initiatorGameover: boolean;

  @Field()
  @prop({ default: false })
  inviteeGameover: boolean;

  @Field(() => [Int])
  @prop({ type: [Number] })
  initiatorState: number[];

  @Field(() => [Int])
  @prop({ type: [Number] })
  inviteeState: number[];
}

export const GameModel = getModelForClass(Game);
