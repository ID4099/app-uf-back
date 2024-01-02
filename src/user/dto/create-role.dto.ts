import { IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateRoleDto {
    _id?: ObjectId;
    id?: string;
    @IsString() @IsNotEmpty()
    type: string;
}