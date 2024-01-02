import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { DataConverterDto, ConvertionDataDto } from './dto/data-converter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Convertions } from './schemas/convertions.schema';
import { Model } from 'mongoose';
import { UserTypeVerify } from './tools/userType.verify';
import * as Excel from 'exceljs';


@Injectable()
export class UfCaseService {
    constructor(
        @InjectModel(Convertions.name) private readonly ConvertionsModel: Model<Convertions>
    ){}

    async createConvertion( data: ConvertionDataDto ): Promise<boolean>{
        try {
            data.convertionDate = new Date();
            const newConvertion = new this.ConvertionsModel(data);
            await newConvertion.save();
            return true;
        } catch (error) {
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async bringConvertions(): Promise<ConvertionDataDto[]>{
        try {
            const selectAttributes = [ 'activityDate', 'ufValue', 'ufHowMany', 'convertionDate', 'convertionAmount', 'userType' ]
            const result = await this.ConvertionsModel.find().select(selectAttributes);
            return result
        } catch (error) {
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createHistoryFile(convertionRecord, res): Promise<any> {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');
    
        worksheet.columns = [
          { header: 'Fecha Actividad', key: 'activityDate', width: 25 },
          { header: 'Valor de UF', key: 'ufValue', width: 25 },
          { header: 'Cantidad UF', key: 'ufHowMany', width: 25 },
          { header: 'Fecha de conversión', key: 'convertionDate', width: 25 },
          { header: 'Monto de Conversión', key: 'convertionAmount', width: 25 },
          { header: 'Tipo de Usuario', key: 'userType', width: 25 },
        ];
        
        await convertionRecord.convertions.map(convertion => {
            const {
                activityDate,
                userType,
                ufHowMany,
                ufValue,
                convertionDate,
                convertionAmount
            } = convertion;

            worksheet.addRow({
                activityDate,
                ufValue,
                ufHowMany,
                convertionDate,
                convertionAmount,
                userType
            });
            return convertion;
        })
    
        const buffer = await workbook.xlsx.write(res);
    
        return buffer;
      }
}
