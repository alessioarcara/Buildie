import { Field, ID, ObjectType } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";

@ObjectType({ description: "The game model" })
export class Game {
  @Field(() => ID)
  _id: string;

  @Field(() => [Number])
  @prop({ type: [Number] })
  initiatorState: number[];

  @Field(() => [Number])
  @prop({ type: [Number] })
  inviteeState: number[];
}

export const GameModel = getModelForClass(Game);
