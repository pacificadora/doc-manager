import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { NullableType } from 'src/common/types/nullable.type';
import { UserEntity } from 'src/database/entities/user.entity';
import { User } from './domain/user.domain';
import { UserMapper } from './repositories/mapper/user.mapper';

@Injectable()
export class UsersRepository {
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
    async findByEmail(email: User['email']): Promise<NullableType<UserEntity>> {
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