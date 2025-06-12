import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { Allow } from 'class-validator';

import { FileDriver } from '../../../common/types/file.type';
import { EnvConstants } from '../../../constants/env.constants';

export class FileType {
    @ApiProperty({
        type: Number,
        example: 1,
    })
    @Allow()
    id: number;

    @ApiProperty({
        type: String,
        example: 'https://example.com/path/to/file.jpg',
    })
    @Transform(
        ({ value }: TransformFnParams): Promise<string> | string => {
            if (process.env[EnvConstants.FILE_DRIVER] === FileDriver.LOCAL) {
                return (
                    (process.env[EnvConstants.BACKEND_DOMAIN] ??
                        `http://localhost:${process.env[EnvConstants.APP_PORT]}`) + value
                );
            } else if (
                [FileDriver.S3_PRESIGNED, FileDriver.S3].includes(
                    process.env[EnvConstants.FILE_DRIVER] as FileDriver,
                )
            ) {
                const s3 = new S3Client({
                    region:
                        (process.env[EnvConstants.S3_REGION] as string) || 'ap-south-1',
                    credentials:
                        process.env[EnvConstants.S3_ACCESS_KEY_ID] &&
                            process.env[EnvConstants.S3_SECRET_ACCESS_KEY]
                            ? {
                                accessKeyId: process.env[EnvConstants.S3_ACCESS_KEY_ID],
                                secretAccessKey:
                                    process.env[EnvConstants.S3_SECRET_ACCESS_KEY],
                            }
                            : undefined,
                });

                const command = new GetObjectCommand({
                    Bucket:
                        (process.env[EnvConstants.S3_DEFAULT_BUCKET] as string) || '',
                    Key: value as string,
                });

                return getSignedUrl(s3, command, {
                    expiresIn: Number(
                        process.env[EnvConstants.S3_SIGNED_URL_EXPIRATION] ?? 3600,
                    ),
                });
            }

            return value as string;
        },
        {
            toPlainOnly: true,
        },
    )
    path: string;

    @ApiProperty({
        type: String,
        example: 'file.jpg',
    })
    originalName: string;

    @ApiProperty({
        type: String,
        example: 'image/jpeg',
    })
    mimeType: string;

    @ApiProperty({
        type: Number,
        example: 1024,
    })
    size: number;
}