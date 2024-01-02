import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Roles, RolesSchema } from './schemas/roles.schema';
import { Users, UsersSchema } from './schemas/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { RolesService } from './roles.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      useFactory: ()=>({
        uri: process.env.MONGO_URI,
      })
    }),
    MongooseModule.forFeature([
      { name: Roles.name, schema: RolesSchema },
      { name: Users.name, schema: UsersSchema }
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_CONSTANT_SECRET,
      signOptions: {
        expiresIn: '1h'
      }
    })
  ],
  controllers: [UserController],
  providers: [
    UserService,
    RolesService
  ],
})
export class UserModule {}
