import { User } from "../../models/User";
import { ObjectType, Field, ID, InputType, Int } from "type-graphql";
import { MutationPayload } from "../genericTypes";

@ObjectType()
export class AuthData {
  @Field(() => ID)
  userId: string;
  @Field()
  accessToken: string;
  @Field()
  refreshToken: string;
  @Field(() => Int)
  expires: number;
}

@ObjectType()
export class AuthenticatePayload extends MutationPayload(AuthData) {}

@InputType()
export class AuthenticateInput implements Pick<User, "email" | "password"> {
  @Field()
  email: string;
  @Field()
  password: string;
}