import { Field, ID, Int, ObjectType } from "type-graphql";
import {
  prop,
  getModelForClass,
  Ref,
  ModelOptions,
} from "@typegoose/typegoose";
import { User } from "./User";

@ObjectType({ description: "The player model" })
@ModelOptions({ schemaOptions: { _id: false } })
export class Player {
  @Field(() => ID)
  @prop({ ref: () => User, required: true })
  user: Ref<User>;

  @Field(() => [Int])
  @prop({ type: [Number], default: [] })
  board: number[];

  @prop({ default: false })
  gameover: boolean;

  @prop({ default: false })
  isReady: boolean;
}

export const PlayerModel = getModelForClass(Player);
