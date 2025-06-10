import { RoleEntity } from '../../../database/entities/role.entity';
import { Role } from '../dto/role-reponse.dto';


export class RoleEntityAdapter {
    static mapToDomain(raw: RoleEntity): Role {
        const role = new Role();
        role.id = raw.id;
        role.name = raw.name;
        role.description = raw.description;
        role.createdAt = raw.createdAt;
        role.updatedAt = raw.updatedAt;
        role.deletedAt = raw.deletedAt;

        return role;
    }

    static mapToEntity(
        domain: Omit<Role, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
    ): RoleEntity {
        const entity = new RoleEntity();

        entity.name = domain.name;
        entity.description = domain.description;

        return entity;
    }
}
