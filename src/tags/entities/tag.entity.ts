import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Tag {
  
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  color: string;

  @Field(() => Int)
  taskId: number;
}

