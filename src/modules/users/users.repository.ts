import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { NullableType } from '../../common/types/nullable.type';
import { UserEntity } from '../../database/entities/user.entity';
import { User } from '../domain/user';
import { UserSettings } from '../domain/user-setting';
import { UserRepository } from '../user.repository';
import { UserMapper } from './mappers/user.mapper';
import { UserSettingsMapper } from './mappers/user-settings.mapper';

@Injectable()
export class UsersRelationalRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) { }

    async create(data: User): Promise<User> {
        const persistenceModel = UserMapper.toPersistence(data);
        const newEntity = await this.usersRepository.save(
            this.usersRepository.create(persistenceModel),
        );
        return UserMapper.toDomain(newEntity);
    }

    async findByEmail(email: User['email']): Promise<NullableType<User>> {
        if (!email) {
            return null;
        }
        const user = await this.usersRepository.findOne({
            where: {
                email,
            },
        });
        return user;
    }

    async findOneBy(
        options: FindOptionsWhere<UserEntity>,
    ): Promise<NullableType<User>> {
        const user = await this.usersRepository.findOneBy(options);
        return user ? UserMapper.toDomain(user) : null;
    }
    async findById(id: number): Promise<NullableType<User>> {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['role', 'settings'],
        });
        return user ? UserMapper.toDomain(user) : null;
    }
}