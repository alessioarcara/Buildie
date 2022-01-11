import { Field, ID, ObjectType } from "type-graphql";
import { prop, getModelForClass, pre } from "@typegoose/typegoose";
import bcrypt from "bcryptjs";

const HASH_ROUNDS = 12;

@pre<User>("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, HASH_ROUNDS, (err, encryptedPassword) => {
    if (err) return next(err);
    user.password = encryptedPassword;
  });
  return next();
})
@ObjectType({ description: "The user model" })
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  @prop({ required: true, unique: true, lowercase: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({ default: 0 })
  count: number;
}

export const UserModel = getModelForClass(User);
