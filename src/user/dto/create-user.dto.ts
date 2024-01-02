import { IsArray, IsEmail, IsEmpty, IsNotEmpty, IsNotEmptyObject, IsString } from "class-validator";
export class CreateUserDto {

    id?: string;

    @IsString() @IsNotEmpty()
    name: string;

    @IsString() @IsNotEmpty()
    lastname: string;

    @IsString() @IsNotEmpty()
    user: string;

    @IsString() @IsNotEmpty()
    password?: string;    
}
