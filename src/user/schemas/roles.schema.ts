import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type RolesDocument = Roles & Document;

@Schema()
export class Roles {
    @Prop()
    type: string;
}
export const RolesSchema = SchemaFactory.createForClass(Roles);