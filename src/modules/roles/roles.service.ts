import { Injectable } from '@nestjs/common';
import { NullableType } from '../../common/types/nullable.type';
import { DetailsNotFoundException } from '../../exceptions';
import { Role } from './dto/role-reponse.dto'
import { RoleRepository } from './roles.repository';

@Injectable()
export class RolesService {
    constructor(private readonly roleRepository: RoleRepository) { }

    async findById(id: string): Promise<NullableType<Role>> {
        return this.roleRepository.findById(id);
    }

    async findDefaultRole(): Promise<NullableType<Role>> {
        return this.roleRepository.findDefaultRole();
    }

    async changeRole(userId: string, roleId: string): Promise<void> {
        const role = await this.findById(roleId);
        if (!role) {
            throw new DetailsNotFoundException('Role', 'id', roleId);
        }

        return this.roleRepository.changeRole(userId, role.id);
    }
}