import { Entity, Column, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity('roles')
export class RoleEntity extends BaseEntity {
    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    isDefault?: boolean

    @OneToMany(() => UserEntity, (user) => user.role)
    users: UserEntity[];
}
