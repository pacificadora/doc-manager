import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Document } from './document.entity';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity('ingestion_jobs')
export class IngestionJobEntity extends BaseEntity {
    @ManyToOne(() => Document)
    @JoinColumn({ name: 'document_id' })
    document: Document;
    @Column()
    documentId: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'updated_by' })
    updatedBy: UserEntity;

    @Column()
    updated_by: string;

    @Column({ default: 'pending' }) // pending, in_progress, completed, failed
    status: string;

    @Column({ nullable: true })
    errorMessage: string;

    @Column({ nullable: true })
    startedAt: Date;

    @Column({ nullable: true })
    endedAt: Date;
}
