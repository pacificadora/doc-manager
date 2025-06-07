import { DataSource } from "typeorm";
import { config } from 'dotenv';
import { EnvConstants } from "../constants/env.constants";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

config();

export const databaseConnection: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get(EnvConstants.POSTGRES_HOST),
        port: configService.get(EnvConstants.POSTGRES_PORT),
        username: configService.get(EnvConstants.POSTGRES_USER),
        password: configService.get(EnvConstants.POSTGRES_PASSWORD),
        database: configService.get(EnvConstants.POSTGRES_DB),
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        migrations: [__dirname + "/../migrations/*{.ts,.js}"],
        synchronize: true,
        // logging: true,
    }),
}