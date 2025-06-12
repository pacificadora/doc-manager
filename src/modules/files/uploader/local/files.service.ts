import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import { ApiConfigService } from '../../../../shared/api-config.service';
import { Multer } from 'multer';
import { FileType } from '../../domain/file';
import { FileRepository } from '../../files.repository';

@Injectable()
export class FilesLocalService {
    constructor(
        private readonly configService: ApiConfigService,
        private readonly fileRepository: FileRepository,
    ) { }

    async create(file: Multer.File): Promise<{ file: FileType }> {
        if (!file) {
            throw new NotFoundException('File not found');
        }

        const normalizedPath = path.posix.join(
            '/',
            this.configService.apiPrefix,
            'v1',
            file.path.split(path.sep).join('/'),
        );

        return {
            file: await this.fileRepository.create({
                path: normalizedPath,
                originalName: file.originalname,
                mimeType: file.mimetype,
                size: file.size,
            }),
        };
    }
}