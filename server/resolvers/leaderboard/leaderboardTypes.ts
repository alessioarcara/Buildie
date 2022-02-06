import { User } from "../../models/User";
import { MutationPayload } from "../genericTypes";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Score implements Pick<User, "username" | "score"> {
  @Field(() => ID)
  _id: string;
  @Field()
  username: string;
  @Field()
  score: number;
}

@ObjectType()
export class SubmitScorePayload extends MutationPayload(Score) {}
