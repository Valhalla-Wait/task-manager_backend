import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Project {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  ownerId: number;
}

@ObjectType()
export class ProjectMore {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  ownerId: number;

  @Field(() => [Task])
  tasks: Task[];

  @Field(() => [User])
  members: User[];
}



ObjectType()
export class ProjectTask {}