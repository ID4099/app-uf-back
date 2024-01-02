import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserAuthDto {
    alias?: string;

    @IsString() @IsNotEmpty()
    user: string;

    @IsString() @IsNotEmpty()
    password: string;
}