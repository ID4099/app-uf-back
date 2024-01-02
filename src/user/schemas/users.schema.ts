import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Roles } from "./roles.schema";
import mongoose, { Document} from "mongoose";

export type UsersDocument = Users & Document;

@Schema({ timestamps: true })
export class Users {
    @Prop()
    name: string;

    @Prop()
    lastname: string;

    @Prop({ unique: true })
    user: string;

    @Prop({ unique: true })
    password: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Roles'}] })
    roles: Roles[];
}; 
export const UsersSchema = SchemaFactory.createForClass(Users);