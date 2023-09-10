import { Module, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entities';
import { User } from './entities/user.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, User]),
    AuthModule
  ],
  controllers: [
    UsersController
  ],
  providers: [
    UsersService,
  ],
  exports: []
})
export class UsersModule {}
