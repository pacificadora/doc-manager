import { OmitType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";
import { UserEntity } from "src/database/entities/user.entity";

export class LoginResponse extends OmitType(UserEntity, ['password'] as const) {
    @IsString()
    @IsNotEmpty()
    token: string;
}