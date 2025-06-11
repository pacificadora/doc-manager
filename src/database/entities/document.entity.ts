import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { FileEntity } from './file.entity';
import { UserEntity } from './user.entity';

@Entity('documents')
export class DocumentEntity extends BaseEntity {
    @ApiProperty({ example: 'Project Requirements' })
    @Column()
    title: string;

    @ApiProperty({ example: 'Project scope and requirements documentation' })
    @Column({ nullable: true })
    description?: string;

    @OneToOne(() => FileEntity, { cascade: true, nullable: true })
    @JoinColumn({ name: 'file_id' })
    file: FileEntity | null;

    @Column({ name: 'file_id', unique: true, nullable: true })
    fileId: number | null;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: 'uploaded_by_id' })
    uploadedBy: UserEntity;
}