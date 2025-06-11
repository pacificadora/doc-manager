import { type DataSource } from 'typeorm';

import { RoleType } from '../../common/types/role.type';
import { RoleEntity } from '../entities/role.entity';

export async function seedRoles(dataSource: DataSource): Promise<void> {
    const roleRepository = dataSource.getRepository(RoleEntity);

    const existingRoles = await roleRepository.find();
    if (existingRoles.length > 0) {
        console.log('Roles already exist.');
        return;
    }

    const roles: Partial<RoleEntity>[] = [
        {
            id: RoleType.USER,
            name: 'User',
            description: 'Regular user with basic permissions',
            isDefault: true,
        },
        {
            id: RoleType.ADMIN,
            name: 'Admin',
            description: 'Administrator with full permissions',
            isDefault: false,
        },
    ];

    await roleRepository.save(roles);
    console.log('Default roles seeded successfully');
}