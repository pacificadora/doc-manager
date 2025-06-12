import { Injectable } from '@nestjs/common';

import { NullableType } from '../../common/types/nullable.type';
import { FileEntity } from 'src/database/entities/file.entity';
import { FileRepository } from './files.repository';

@Injectable()
export class FilesService {
    constructor(private readonly fileRepository: FileRepository) { }

    findById(id: number): Promise<NullableType<FileEntity>> {
        return this.fileRepository.findById(id);
    }

    findByIds(ids: number[]): Promise<FileEntity[]> {
        return this.fileRepository.findByIds(ids);
    }

    create(fileData: Partial<FileEntity>): Promise<FileEntity> {
        return this.fileRepository.create(fileData);
    }

    async remove(id: number): Promise<void> {
        await this.fileRepository.remove(id);
    }
}