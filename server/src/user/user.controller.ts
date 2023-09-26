import { Body, ConflictException, Controller, Get, Post, UseGuards, Param, Put} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from './dto/checkUser.dto';
import { AuthGuard } from '@nestjs/passport';
// import { Request } from 'express'
import { User } from './decorator/user.decorator';
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
    async detailUser(@User() user: any){
        return await this.userService.getUser(user.userId);
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


    @Get('/:email')
    async getUserDetail(@Param('email') email: string)
    {
        return await this.userService.getUserDetails(email);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/update')
    async updateUser(@Body() data: any, @User() user: any){
        return await this.userService.updateUser(data, user.userId);
    }
}