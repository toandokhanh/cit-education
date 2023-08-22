import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
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
        return await this.userService.getUser();
    }
    
    @Post('/register')
    async register(@Body() user: UserDTO) {
        
        return await this.userService.registerUser(user);
    }

    @Post('/login')
    async login()
    {
        return await this.userService.loginUser();
    }

}