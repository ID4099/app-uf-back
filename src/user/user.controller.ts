import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from './roles.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly rolesService: RolesService
    ) {}

  @Post('/signin')
  signin(@Body() userData: { user, password }) {
    return this.userService.signin(userData);
  }

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto);
  }

  @Post('/new/role')
  newRole(@Body('type') type: string){
    return this.rolesService.create({ type });
  }
}
