import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CreateUserInput as CreateUserInput } from './dto/new-recipe.input';
import { UsersArgs } from './dto/recipes.args';
import { User } from './models/user.model';
import { UserService } from './user.service';

const pubSub = new PubSub();

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // 获取单个用户
  @Query((returns) => User)
  async user(@Args('id') id: string): Promise<User> {
    const recipe = await this.userService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  // 获取所有用户
  @Query((returns) => [User])
  users(@Args() usersArgs: UsersArgs): Promise<User[]> {
    return this.userService.findAll(usersArgs);
  }

  // 新增用户
  @Mutation((returns) => User)
  async addUser(@Args('user') user: CreateUserInput): Promise<User> {
    const userAdded = await this.userService.create(user);
    pubSub.publish('userAdded', { userAdded });
    return userAdded;
  }

  // 移除用户
  @Mutation((returns) => Boolean)
  async removeUser(@Args('id') id: string) {
    return this.userService.remove(id);
  }

  @Subscription((returns) => User)
  recipeAdded() {
    return pubSub.asyncIterator('userAdded');
  }
}
