
import { ApiProperty } from '@nestjs/swagger';

export class Role {
    @ApiProperty({
        type: 'string',
    })
    id: string;

    @ApiProperty({
        type: String,
        example: 'admin',
    })
    name?: string;

    @ApiProperty({
        type: String,
        example: 'admin',
    })
    description?: string;

    @ApiProperty({
        type: Boolean,
        example: true,
    })
    isDefault?: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    deletedAt: Date;
}
