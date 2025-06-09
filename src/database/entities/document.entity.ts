import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity('documents')
export class Document extends BaseEntity {
    @Column()
    fileName: string;

    @Column()
    filePath: string;

    @Column()
    mimeType: string;

    @Column({ default: 'uploaded' }) // uploaded, processing, ingested, failed
    status: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: string;

    @Column({ default: false })
    isDeleted: boolean;
}
