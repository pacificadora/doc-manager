export enum FileDriver {
    LOCAL = 'local',
    S3 = 's3',
    S3_PRESIGNED = 's3-presigned',
}

export type FileConfig = {
    driver: FileDriver;
    accessKeyId?: string;
    secretAccessKey?: string;
    awsDefaultS3Bucket?: string;
    awsS3Region?: string;
    maxFileSize: number;
    expiresIn: number;
};

export type DomainConfig = {
    backendDomain: string;
    frontendDomain: string;
};