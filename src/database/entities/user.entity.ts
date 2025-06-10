import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RoleEntity } from './role.entity';
import { BaseEntity } from './base.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @ManyToOne(() => RoleEntity, (role) => role.users, { eager: true })
    @JoinColumn({ name: 'roleId' })
    role: RoleEntity;
    @Column()
    roleId: string;

    @Column()
    isActive: boolean;

    @Column({ default: false })
    isDeleted: boolean;
}