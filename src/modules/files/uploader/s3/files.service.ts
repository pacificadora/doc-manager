import {
    HttpStatus,
    Injectable,
    UnprocessableEntityException,
} from '@nestjs/common';
import { Multer } from 'multer';

import { FileType } from '../../domain/file';
import { FileRepository } from '../../files.repository';

@Injectable()
export class FilesS3Service {
    constructor(private readonly fileRepository: FileRepository) { }

    async create(file: Multer.File & { bucket: string; key: string; location: string }): Promise<{ file: FileType }> {
        if (!file) {
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    file: 'selectFile',
                },
            });
        }

        return {
            file: await this.fileRepository.create({
                path: file.key,
                originalName: file.originalname,
                mimeType: file.mimetype,
                size: file.size,
            }),
        };
    }
}