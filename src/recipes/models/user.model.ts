import {
  Directive,
  Field,
  ID,
  Int,
  InterfaceType,
  ObjectType,
} from '@nestjs/graphql';

@InterfaceType()
export class Salary {
  @Field(() => Int, { nullable: true })
  original?: string;

  @Field(() => Int, { nullable: true })
  extra?: string;
}

@ObjectType({ description: '用户实体-演示' })
export class User {
  @Field((type) => ID, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => Salary, { nullable: true })
  salary?: {
    original?: number;
    extra?: number;
  };
}
