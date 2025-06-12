import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv from 'dotenv';

import { FileDriver } from '../../common/types/file.type';
import { EnvConstants } from '../../constants/env.constants';
import { FileEntity } from 'src/database/entities/file.entity';
import { FileRepository } from './files.repository';
import { FilesService } from './files.service';
import { FilesLocalModule } from './uploader/local/files.module';
import { FilesS3Module } from './uploader/s3/files.module';
import { FilesS3PresignedModule } from './uploader/s3-presigned/files.module';

dotenv.config();
const fileDriver = process.env[EnvConstants.FILE_DRIVER];
const UploadModule =
    fileDriver === FileDriver.LOCAL
        ? FilesLocalModule
        : fileDriver === FileDriver.S3
            ? FilesS3Module
            : FilesS3PresignedModule;
@Module({
    imports: [TypeOrmModule.forFeature([FileEntity]), UploadModule],
    providers: [
        FilesService,
        {
            provide: FileRepository,
            useClass: FileRepository,
        },
    ],
    exports: [FilesService],
})
export class FilesModule { }