import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NullableType } from "src/common/types/nullable.type";
import { RoleEntity } from "src/database/entities/role.entity";
import { UserEntity } from "src/database/entities/user.entity";
import { Repository } from "typeorm";
import { Role } from "./dto/role-reponse.dto";
import { RoleEntityAdapter } from "./adapter/role-entity.adapter";

@Injectable()
export class RoleRepository {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly rolesRepository: Repository<RoleEntity>,
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) { }

    async findDefaultRole(): Promise<NullableType<Role>> {
        const role = await this.rolesRepository.findOne({
            where: {
                isDefault: true,
            },
        });
        return role ? RoleEntityAdapter.mapToDomain(role) : null;
    }

    async findById(id: number): Promise<NullableType<Role>> {
        const role = await this.rolesRepository.findOne({
            where: {
                id: id,
            },
        });
        return role ? RoleEntityAdapter.mapToDomain(role) : null;
    }

    async changeRole(userId: number, roleId: number): Promise<void> {
        await this.usersRepository.update(userId, { role: { id: roleId } });
    }
}