import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Mixed } from "mongoose";

export type ConvertionsDocument = Convertions & Document;

@Schema({ timestamps: true })
export class Convertions {
    @Prop()
    activityDate: Date;

    @Prop({ type: 'Mixed' })
    userType: Mixed;

    @Prop()
    ufHowMany: number;

    @Prop()
    ufValue: number;

    @Prop()
    convertionDate: Date;

    @Prop()
    convertionAmount: number;
}; 
export const ConvertionsSchema = SchemaFactory.createForClass(Convertions);