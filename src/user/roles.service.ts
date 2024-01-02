import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Roles } from "./schemas/roles.schema";
import { Model } from "mongoose";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RolesService {
    constructor(@InjectModel(Roles.name) private readonly RolesModel: Model<Roles>){};
    async create({ type }):Promise<boolean>{
        try {
            const newRol = new this.RolesModel({ type: type.toUpperCase() });
            newRol.save();
            return true;
        } catch (error) {
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
    async findRoleByType(type: string): Promise<CreateRoleDto>{
        return await this.RolesModel.findOne({ type });
    }
    async findAll(): Promise<CreateRoleDto[]>{
        return await this.RolesModel.find();
    }
}