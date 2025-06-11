import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
    @IsString()
    readonly firstName!: string;

    @IsString()
    readonly lastName!: string;

    @IsEmail()
    readonly email!: string;

    @IsString()
    readonly password!: string;

    @IsString()
    phone?: string;
}