import { Module } from '@nestjs/common';
import { UfCaseService } from './uf-case.service';
import { UfCaseController } from './uf-case.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Convertions, ConvertionsSchema } from './schemas/convertions.schema';
import { UserTypeVerify } from './tools/userType.verify';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      useFactory: ()=>({
        uri: process.env.MONGO_URI
      })
    }),
    MongooseModule.forFeature([
      { name: Convertions.name, schema: ConvertionsSchema }
    ]),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [UfCaseController],
  providers: [
    UfCaseService,
    UserTypeVerify
  ],
})
export class UfCaseModule {}
