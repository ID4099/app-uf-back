import { Body, Controller, HttpCode, Post, UseGuards, Req, Res, Get, Header } from '@nestjs/common';
import { UfCaseService } from './uf-case.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles, Role } from 'src/decorators/roles.decorator';
import { ConvertionDataDto } from './dto/data-converter.dto';

@Controller('uf-case')
export class UfCaseController {
  constructor(
    private readonly ufCaseService: UfCaseService
    ) {}

  @Post('/create')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EXCECUTIVE)
  @HttpCode(200)
  async createConvertion(@Body() dataConverterDto: ConvertionDataDto){
    return await this.ufCaseService.createConvertion(dataConverterDto);
  }

  @Get('/bring/all')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  async bringConvertions(){
    return await this.ufCaseService.bringConvertions();
  }

  @Post('/download/file')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename="history.xlsx"')
  async getStaticFile(@Body() convertionRecord, @Res() res: Response) {
    await this.ufCaseService.createHistoryFile(convertionRecord, res);
    return true;
  } 
}
