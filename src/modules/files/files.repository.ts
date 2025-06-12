import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NullableType } from '../../common/types/nullable.type';
import { FileEntity } from '../../database/entities/file.entity';

@Injectable()
export class FileRepository {
    constructor(
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>,
    ) { }

    async create(data: Partial<FileEntity>): Promise<FileEntity> {
        const newFile = this.fileRepository.create(data);
        return this.fileRepository.save(newFile);
    }

    async findById(id: number): Promise<NullableType<FileEntity>> {
        return this.fileRepository.findOne({
            where: { id },
        });
    }

    async findByIds(ids: number[]): Promise<FileEntity[]> {
        return this.fileRepository.find({
            where: ids.map((id) => ({ id })),
        });
    }

    async remove(id: number): Promise<void> {
        await this.fileRepository.softDelete(id);
    }
}