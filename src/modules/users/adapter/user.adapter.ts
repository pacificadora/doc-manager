import { UserEntity } from "src/database/entities/user.entity";
import { UserResponse } from "../dto/create-user.response";
import { RoleEntity } from "src/database/entities/role.entity";


export class UserEntityAdapter {
    static mapToDomain(raw: UserEntity): UserResponse {
        const user = new UserResponse();

        user.id = raw.id;
        user.email = raw.email;
        user.firstName = raw.firstName;
        user.lastName = raw.lastName;

        // user.photo = raw.photo
        //   ? FileEntityAdapter.mapToDomain(raw.photo)
        //   : null;

        user.role = raw.role;
        user.createdAt = raw.createdAt;
        user.updatedAt = raw.updatedAt;
        user.deletedAt = raw.deletedAt;

        return user;
    }

    static mapToEntity(domain: UserEntity): UserEntity {
        const entity = new UserEntity();

        if (domain.id && typeof domain.id === 'number') {
            entity.id = domain.id;
        }

        entity.email = domain.email;
        entity.password = domain.password;
        entity.salt = domain.salt;
        entity.firstName = domain.firstName;
        entity.lastName = domain.lastName;

        // entity.photo = domain.photo
        //     ? FileEntityAdapter.mapToPersistence(domain.photo)
        //     : null;

        if (domain.role) {
            const role = new RoleEntity();
            role.id = domain.role.id;
            entity.role = role;
        }

        entity.createdAt = domain.createdAt;
        entity.updatedAt = domain.updatedAt;
        entity.deletedAt = domain.deletedAt;

        return entity;
    }
}
