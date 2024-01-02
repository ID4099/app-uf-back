import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserAuthDto } from './dto/user-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { Model } from 'mongoose';
import { isValidated, encryptPassword } from './tools/bcrypt-helper';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from './roles.service';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(Users.name) private readonly UserModel: Model<Users>,
    private readonly RolesService: RolesService,
    private jwtService: JwtService
  ){}

  async create({ name, lastname, user, password }: CreateUserDto): Promise<any> {
    try {
      const hashedPassword = await encryptPassword(password);
      const { _id } = await this.RolesService.findRoleByType('EXCECUTIVE');
      const newUser = new this.UserModel({ name, lastname, user, password: hashedPassword, roles: [ { _id } ] });
      const userSaved = await newUser.save();
      return userSaved;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async signin({ user, password }: UserAuthDto): Promise<{ access_token: string }> {
    try {
        const currentUser = await this.UserModel.findOne({ user }).populate('roles', ['type']).exec();
        if(!currentUser) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        
        const validatePassword = await isValidated(password, currentUser?.password);
        if(!validatePassword) throw new UnauthorizedException();

        const { id: _id, name: _name, lastname: _lastname, user: _user, roles: _roles } = currentUser;

        return { 
            access_token: await this.jwtService.signAsync({ id: _id, name: _name, lastname: _lastname, user: _user, roles: _roles })
        };
    } catch (error) {
        throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

async signup({ name, lastname, user, password }: CreateUserDto): Promise<{ session: boolean, access_token: string }>{
    try {
        const newUser = await this.create({ name, lastname, user, password });
        if(!newUser) throw new HttpException('error in created', HttpStatus.BAD_REQUEST);

        const { id: _id, name: _name, lastname: _lastname, user: _user, roles: _roles } = newUser;

        return {
            session: true,
            access_token: await this.jwtService.signAsync({ id: _id, name: _name, lastname: _lastname, user: _user, roles: _roles })
        }

    } catch (error) {
        throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
}
