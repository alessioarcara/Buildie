import { Field, ClassType, ObjectType } from "type-graphql";

export function MutationPayload<TData>(TDataClass: ClassType<TData>) {
  @ObjectType({ isAbstract: true })
  abstract class MutationPayloadClass {
    @Field(() => TDataClass, { nullable: true })
    data?: TData;
    @Field({ nullable: true })
    problem?: string;
  }

  return MutationPayloadClass;
}
