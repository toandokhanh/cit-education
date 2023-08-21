import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

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
    async register()
    {
        return await this.userService.registerUser();
    }
    @Post('/login')
    async login()
    {
        return await this.userService.loginUser();
    }

}