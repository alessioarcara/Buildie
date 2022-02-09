import { Field, ID, Int, ObjectType } from "type-graphql";
import { prop, getModelForClass, pre } from "@typegoose/typegoose";
import bcrypt from "bcryptjs";

const HASH_ROUNDS = 12;

@pre<User>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, HASH_ROUNDS);
    return next();
  } catch (err: any) {
    return next(err);
  }
})
@ObjectType({ description: "The user model" })
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  @prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Field()
  @prop({ required: true, unique: true, lowercase: true })
  username: string;

  @prop({ required: true })
  password: string;

  @prop({ default: 0 })
  count: number;

  @Field(() => Int)
  @prop({ default: 0 })
  score: number;

  @Field()
  @prop()
  expoToken?: string;
}

export const UserModel = getModelForClass(User);
