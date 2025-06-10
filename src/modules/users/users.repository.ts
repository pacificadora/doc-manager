import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { NullableType } from '../../common/types/nullable.type';
import { UserEntity } from '../../database/entities/user.entity';
import { UserEntityAdapter } from './adapter/user.adapter';
import { UserResponse } from './dto/create-user.response';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) { }

    async create(data: UserEntity): Promise<UserResponse> {
        const entity = UserEntityAdapter.mapToEntity(data);
        const savedEntity = await this.usersRepository.save(
            this.usersRepository.create(entity),
        );
        const domainUser = UserEntityAdapter.mapToDomain(savedEntity);
        return this.toResponse(domainUser);
    }

    async findByEmail(email: UserEntity['email']): Promise<NullableType<UserResponse>> {
        if (!email) return null;

        const entity = await this.usersRepository.findOne({
            where: { email },
            relations: ['role', 'settings'],
        });

        if (!entity) return null;

        const domainUser = UserEntityAdapter.mapToDomain(entity);
        return this.toResponse(domainUser);
    }

    async findOneBy(
        options: FindOptionsWhere<UserEntity>,
    ): Promise<NullableType<UserResponse>> {
        const entity = await this.usersRepository.findOneBy(options);
        if (!entity) return null;

        const domainUser = UserEntityAdapter.mapToDomain(entity);
        return this.toResponse(domainUser);
    }

    async findById(id: string): Promise<NullableType<UserResponse>> {
        const entity = await this.usersRepository.findOne({
            where: { id },
            relations: ['role', 'settings'],
        });

        if (!entity) return null;

        const domainUser = UserEntityAdapter.mapToDomain(entity);
        return this.toResponse(domainUser);
    }

    private toResponse(user: UserResponse): UserResponse {
        const { password, salt, ...safeFields } = user;
        return {
            ...safeFields,
        } as UserResponse;
    }
}
