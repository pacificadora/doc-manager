import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/database/entities/user.entity';
import { FilesModule } from '../files/files.module';
import { RolesModule } from '../roles/roles.module';
import { UsersRepository } from './users.repository';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    RolesModule,
    FilesModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UsersRepository,
      useClass: UsersRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule { }