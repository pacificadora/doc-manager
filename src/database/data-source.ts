import { DataSource, DataSourceOptions } from "typeorm";
import { config } from 'dotenv';
import { ENV_CONSTANTS_VALUES, EnvConstants } from "../constants/env.constants";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { join } from "path";

config();
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env[EnvConstants.POSTGRES_HOST],
    port: parseInt(process.env[EnvConstants.PORT] || '5432', 10),
    username: process.env[EnvConstants.POSTGRES_USER],
    password: process.env[EnvConstants.POSTGRES_PASSWORD],
    database: process.env[EnvConstants.POSTGRES_DB],
    entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, './migrations/**/*{.ts,.js}')],
    synchronize:
        process.env[EnvConstants.NODE_ENV] === ENV_CONSTANTS_VALUES.LOCAL,
};
export const AppDataSource = new DataSource(dataSourceOptions);