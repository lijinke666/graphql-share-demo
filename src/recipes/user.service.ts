import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/new-recipe.input';
import { UsersArgs } from './dto/recipes.args';
import { User } from './models/user.model';

const users: User[] = [
  {
    id: '1',
    name: '小李',
    salary: {
      original: 1000_000_000_000,
      extra: 20,
    },
  },
  {
    id: '2',
    name: '小明',
    salary: {
      original: 222,
      extra: 20,
    },
  },
  {
    id: '3',
    name: '小张',
    salary: {
      original: 9.9,
      extra: 20,
    },
  },
];

@Injectable()
export class UserService {
  async create(data: CreateUserInput): Promise<User> {
    const user: User = {
      id: `${Date.now()}`,
      ...data,
    };
    users.push(user);
    return user;
  }

  async findOneById(id: string): Promise<User> {
    return users.find((user) => user.id === id);
  }

  async findAll(recipesArgs: UsersArgs): Promise<User[]> {
    return users;
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
