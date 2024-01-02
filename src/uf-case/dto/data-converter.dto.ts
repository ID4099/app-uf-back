import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DataConverterDto {

    @IsDate() @IsNotEmpty()
    date: string;

    @IsNumber() @IsNotEmpty()
    howmany: number;
}

export class ConvertionDataDto {

        @IsDate() @IsNotEmpty()
        activityDate: Date;

        @IsArray() @ArrayNotEmpty()
        userType: any;

        @IsNumber() @IsNotEmpty()
        ufHowMany: number;

        @IsNumber() @IsNotEmpty()
        ufValue: number;

        @IsDate() @IsNotEmpty()
        convertionDate?: Date;

        @IsNumber() @IsNotEmpty()
        convertionAmount: number;
}