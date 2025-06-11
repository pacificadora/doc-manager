import { DocumentMapper } from 'src/modules/documents/repositories/mappers/document.mapper';
import { DocumentEntity } from '../../../database/entities/document.entity';
import { IngestionJobEntity } from '../../../database/entities/ingestion-job.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { UserMapper } from '../../../users/repositories/mappers/user.mapper';
import { Ingestion } from '../../ingestion/domain/ingestion';

export class IngestionEntityAdapter {
    static toDomain(raw: IngestionJobEntity): Ingestion {
        const domain = new Ingestion();
        domain.id = raw.id;
        domain.status = raw.status;
        domain.error = raw.error;
        domain.metadata = raw.metadata;
        domain.createdAt = raw.createdAt;
        domain.updatedAt = raw.updatedAt;

        if (raw.document) {
            domain.document = DocumentMapper.toDomain(raw.document);
        }

        if (raw.triggeredBy) {
            domain.triggeredBy = UserMapper.toDomain(raw.triggeredBy);
        }

        return domain;
    }

    static toPersistence(domain: Partial<Ingestion>): Partial<IngestionEntity> {
        const persistence = new IngestionEntity();

        if (domain.id) {
            persistence.id = domain.id;
        }

        if (domain.status) {
            persistence.status = domain.status;
        }

        if (domain.error !== undefined) {
            persistence.error = domain.error;
        }

        if (domain.metadata !== undefined) {
            persistence.metadata = domain.metadata;
        }

        if (domain.document) {
            const document = new Document();
            document.id = domain.document.id;
            persistence.document = document;
            persistence.documentId = document.id;
        }

        if (domain.triggeredBy) {
            const user = new UserEntity();
            user.id = domain.triggeredBy.id;
            persistence.triggeredBy = user;
            persistence.triggeredById = user.id;
        }

        return persistence;
    }
}