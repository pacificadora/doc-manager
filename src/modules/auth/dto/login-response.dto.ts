import { IsString } from 'class-validator';

export class LoginPayloadDto {
    @IsString()
    accessToken: string;
    @IsString()
    refreshToken: string;
}