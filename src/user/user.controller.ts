import { Body, ConflictException, Controller, Get, Post , BadRequestException} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from './dto/checkUser.dto';
// import { log } from 'console';
// import { plainToClass } from 'class-transformer';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    )
    {}
    @Get()
    async getUser()
    {
        return await this.userService.getUsers();
    }
    
    @Post('/register')
    async register(@Body() user: UserDTO) {
        const realUser = UserDTO.plainToClass(user);
        const checkUser = await this.userService.findOneByEmail(realUser.email);
        if (checkUser) {
            throw new ConflictException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(realUser.password, 12);
        realUser.password = hashedPassword
        return await this.userService.registerUser(realUser);
    }

    @Post('/login')
    async login(@Body() user: LoginUserDTO)
    {
        const checkUser = await this.userService.findOneByEmail(user.email);
        // check email
        if (!checkUser) {
            throw new ConflictException('invalid credentials');
        }
        // check password
        if (!await bcrypt.compare(user.password, checkUser.password)) {
            throw new BadRequestException('invalid credentials');
        }
        return checkUser;
        // return await this.userService.loginUser();
    }

}