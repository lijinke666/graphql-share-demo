import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserService, DateScalar],
})
export class UserModule {}
