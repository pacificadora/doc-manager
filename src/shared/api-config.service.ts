
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { NamingStrategyInterface } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import {
    DomainConfig,
    FileConfig,
    FileDriver,
} from '../common/types/file.type';
import {
    EnvConstants,
    ENV_CONSTANTS_VALUES,
} from '../constants/env.constants';

@Injectable()
export class ApiConfigService {
    constructor(private configService: ConfigService) { }

    get isDevelopment(): boolean {
        return this.nodeEnv === ENV_CONSTANTS_VALUES.DEVELOPMENT;
    }
    get isNotDevelopment(): boolean {
        return !this.isDevelopment;
    }

    get isProduction(): boolean {
        return this.nodeEnv === ENV_CONSTANTS_VALUES.PRODUCTION;
    }

    get isTest(): boolean {
        return this.nodeEnv === ENV_CONSTANTS_VALUES.TEST;
    }
    get isLocal(): boolean {
        return this.nodeEnv === ENV_CONSTANTS_VALUES.LOCAL;
    }

    private get nodeEnv(): string {
        return (
            this.configService.get(EnvConstants.NODE_ENV) ??
            ENV_CONSTANTS_VALUES.DEVELOPMENT
        );
    }

    get port(): number {
        return this.configService.get(EnvConstants.APP_PORT) ?? 3000;
    }

    private getBoolean(key: string): boolean {
        const value = this.get(key);
        try {
            return Boolean(value);
        } catch {
            throw new Error(`${key} environment variable is not a boolean`);
        }
    }
    get documentationEnabled(): boolean {
        return this.getBoolean(EnvConstants.ENABLE_DOCUMENTATION);
    }

    private get(key: string): string {
        const value = this.configService.get<string>(key);

        if (value == null) {
            throw new Error(`${key} environment variable does not set`);
        }

        return value;
    }

    get apiPrefix(): string {
        return this.get(EnvConstants.API_PREFIX);
    }

    private getString(key: string): string {
        const value = this.configService.get<string>(key);
        if (!value) {
            throw new Error(`${key} environment variable does not set`);
        }
        return value;
    }

    private getNumber(key: string): number {
        const value = this.getString(key);
        try {
            return Number(value);
        } catch {
            throw new Error(`${key} environment variable is not a number`);
        }
    }

    get postgresConfig(): TypeOrmModuleOptions {
        const entities = [join(__dirname, '../../database/**/*.entity{.ts,.js}')];
        const migrations = [
            join(__dirname, '../../database/migrations/*{.ts,.js}'),
        ];
        return {
            entities,
            migrations,
            type: 'postgres',
            host: this.getString(EnvConstants.DB_HOST),
            port: this.getNumber(EnvConstants.DB_PORT),
            username: this.getString(EnvConstants.DB_USERNAME),
            password: this.getString(EnvConstants.DB_PASSWORD),
            database: this.getString(EnvConstants.DB_DATABASE),
            migrationsRun: this.isProduction,
            logging: this.getBoolean(EnvConstants.ENABLE_ORM_LOGS),
            namingStrategy: new SnakeNamingStrategy() as NamingStrategyInterface,
            synchronize: this.isLocal,
            extra: {
                max: this.getNumber(EnvConstants.MAX_CONNECTIONS) ?? 100,
                ssl:
                    this.getString(EnvConstants.DB_SSL_ENABLED) === 'true'
                        ? { rejectUnauthorized: false }
                        : undefined,
            },
        };
    }

    get authConfig() {
        return {
            jwtSecret: this.getString(EnvConstants.JWT_SECRET),
            jwtExpirationTime: this.getString(EnvConstants.JWT_EXPIRATION_TIME),
            refreshSecret: this.getString(EnvConstants.JWT_REFRESH_SECRET),
            refreshExpires: this.getString(EnvConstants.JWT_REFRESH_EXPIRATION_TIME),
        };
    }
    get domainConfig(): DomainConfig {
        return {
            backendDomain:
                this.configService.get(EnvConstants.BACKEND_DOMAIN) ??
                `http://localhost:${this.port}`,
            frontendDomain: this.getString(EnvConstants.FRONTEND_DOMAIN),
        };
    }
    get fileConfig(): FileConfig {
        return {
            driver:
                (this.configService.get(EnvConstants.FILE_DRIVER) as FileDriver) ??
                FileDriver.LOCAL,
            accessKeyId: this.getString(EnvConstants.S3_ACCESS_KEY_ID),
            secretAccessKey: this.getString(EnvConstants.S3_SECRET_ACCESS_KEY),
            awsDefaultS3Bucket: this.getString(EnvConstants.S3_DEFAULT_BUCKET),
            awsS3Region: this.getString(EnvConstants.S3_REGION),
            maxFileSize: this.getNumber(EnvConstants.FILE_MAX_SIZE),
            expiresIn: this.getNumber(EnvConstants.S3_SIGNED_URL_EXPIRATION),
        };
    }
}
