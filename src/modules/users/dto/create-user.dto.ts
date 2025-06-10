import { Allow, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly firstName!: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName!: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email!: string;

    @IsNotEmpty()
    @IsString()
    readonly password!: string;

    @IsNotEmpty()
    @IsString()
    phone?: string;

    @IsNotEmpty()
    @IsString()
    roleId?: number | null;

    @Allow()
    salt?: string;

    @IsNotEmpty()
    @IsString()
    photoId?: number | null;
}