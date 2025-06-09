import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Document } from './document.entity';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity('ingestion_jobs')
export class IngestionJob extends BaseEntity {
    @ManyToOne(() => Document)
    @JoinColumn({ name: 'document_id' })
    document: Document;
    @Column()
    documentId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'updated_by' })
    updatedBy: User;

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
