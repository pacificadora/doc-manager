import { RoleEntity } from '../../../../database/entities/role.entity';
import { UserEntity } from '../../../../database/entities/user.entity';
import { User } from '../../domain/user.domain';

export class UserMapper {
    static toDomain(raw: UserEntity): User {
        const domainEntity = new User();
        domainEntity.id = raw.id;
        domainEntity.email = raw.email;
        domainEntity.firstName = raw.firstName;
        domainEntity.lastName = raw.lastName;
        domainEntity.createdAt = raw.createdAt;
        domainEntity.updatedAt = raw.updatedAt;
        domainEntity.deletedAt = raw.deletedAt;
        domainEntity.role = raw.role;
        return domainEntity;
    }

    static toPersistence(domainEntity: User): UserEntity {
        let role: RoleEntity | undefined = undefined;

        if (domainEntity.role) {
            role = new RoleEntity();
            role.id = Number(domainEntity.role.id);
        }

        const persistenceEntity = new UserEntity();
        if (domainEntity.id && typeof domainEntity.id === 'number') {
            persistenceEntity.id = domainEntity.id;
        }
        persistenceEntity.email = domainEntity.email;
        persistenceEntity.password = domainEntity.password;
        persistenceEntity.salt = domainEntity.salt;
        persistenceEntity.firstName = domainEntity.firstName;
        persistenceEntity.lastName = domainEntity.lastName;
        persistenceEntity.role = role;
        persistenceEntity.createdAt = domainEntity.createdAt;
        persistenceEntity.updatedAt = domainEntity.updatedAt;
        persistenceEntity.deletedAt = domainEntity.deletedAt;
        persistenceEntity.role = domainEntity.role;
        persistenceEntity.createdAt = domainEntity.createdAt;
        return persistenceEntity;
    }
}