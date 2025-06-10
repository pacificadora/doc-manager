import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RoleRepository } from './roles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/database/entities/role.entity';
import { UserEntity } from 'src/database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity, UserEntity])
  ],
  controllers: [RolesController],
  providers: [RolesService, RoleRepository],
})
export class RolesModule { }
