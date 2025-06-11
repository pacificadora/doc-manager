import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'files' })
export class FileEntity extends BaseEntity {
    @ApiProperty({ example: 'example.pdf' })
    @Column()
    originalName: string;

    @ApiProperty({ example: 'application/pdf' })
    @Column()
    mimeType: string;

    @ApiProperty({ example: '/uploads/123-example.pdf' })
    @Column()
    path: string;

    @ApiProperty({ example: 1024 })
    @Column()
    size: number;
}