import { Resolver, Query, Mutation, Args, GqlContextType, GraphQLExecutionContext } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { IncomingMessage } from 'http';


@Resolver(() => User)
@UseGuards(AuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }

  @Query(() => [User], { name: 'usersList' })
  getUsers() {
    return this.usersService.getUsers();
  }

  @Query(() => User, { name: 'getCurrentUser' })
  findOne(obj, args, {req}:{req:ContextType}) {
    return this.usersService.getUserByEmail(req.user.email);
  }

  @Mutation(() => [User], { name: 'searchUsers' })
  search(@Args('searchInput') searchString: string) {
    return this.usersService.searchUsers(searchString);
  }
}

type ContextType = IncomingMessage & {
  user:{
    email: string,
    isActivated: boolean,
  }
}