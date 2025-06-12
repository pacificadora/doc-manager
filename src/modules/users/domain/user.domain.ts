import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { FileType } from '../../files/domain/file';
import { RoleEntity } from 'src/database/entities/role.entity';

export class User {
    @ApiProperty({
        type: 'number',
    })
    id: number;

    @ApiProperty({
        type: String,
        example: 'john.doe@example.com',
    })
    @Expose({ groups: ['me', 'admin'] })
    email: string | null;

    @Exclude({ toPlainOnly: true })
    password?: string;

    @Exclude({ toPlainOnly: true })
    salt?: string;

    @ApiProperty({
        type: String,
        example: 'John',
    })
    firstName: string | null;

    @ApiProperty({
        type: String,
        example: 'Doe',
    })
    lastName: string | null;

    @ApiProperty({
        type: () => RoleEntity,
    })
    role?: RoleEntity | null;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    deletedAt: Date;

    @ApiProperty({
        type: () => FileType,
    })
    photo?: FileType | null;
}