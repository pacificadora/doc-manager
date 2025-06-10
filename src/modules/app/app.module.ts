import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConnection } from "src/database/data-source";
import { RolesModule } from "../roles/roles.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync(databaseConnection),
        RolesModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }