import { User } from "../../models/User";
import { MutationPayload } from "../genericTypes";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Score implements Pick<User, "username" | "score"> {
  @Field()
  username: string;
  @Field()
  score: number;
}

@ObjectType()
export class SubmitScorePayload extends MutationPayload(Score) {}
