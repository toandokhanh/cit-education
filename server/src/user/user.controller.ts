import { Body, ConflictException, Controller, Get, Post, UseGuards, Req} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from './dto/checkUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express'
// import { log } from 'console';
// import { plainToClass } from 'class-transformer';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    )
    {}
         
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async detailUser(@Req() request: Request){
        return request.user
    }



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
        return await this.userService.loginUser(user);
    }

}