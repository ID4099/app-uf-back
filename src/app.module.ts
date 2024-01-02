import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UfCaseModule } from './uf-case/uf-case.module';

@Module({
  imports: [UserModule, UfCaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
