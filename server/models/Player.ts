// import { Field, ID, Int, ObjectType } from "type-graphql";
// import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
// import { User, UserModel } from "./User";

// @ObjectType({ description: "The player model", simpleResolvers: true })
// export class Player {
//   @Field(() => ID)
//   @prop({ ref: () => UserModel, required: true })
//   user: Ref<User>;

//   @Field(() => [Int])
//   @prop({ type: [Number], default: [] })
//   board: number[];

//   @Field()
//   @prop({ default: false })
//   gameover: boolean;

//   @Field()
//   @prop({ default: false })
//   isReady: boolean;

//   @Field(() => Int)
//   @prop({ default: 0 })
//   score: number;
// }

// export const PlayerModel = getModelForClass(Player);
