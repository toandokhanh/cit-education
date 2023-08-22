// import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
// import { log } from 'console';

@Injectable()
export class UserService {
    async getUser(){
        return [
            {
                idUser: '1',
                usename: 'toandokhanh',
                email: 'toandokhanh@localhost.com'
            },
            {
                idUser: '2',
                usename: 'toandokhanh',
                email: 'toandokhanh@localhost.com'
            }
        ]
    }

    async registerUser(user: UserDTO) {
        // test hackcode 
        user.id = 1;
        user.createdAt = new Date();
        user.updatedAt = new Date();
        user.dob = new Date();
        const realUser = UserDTO.plainToClass(user);
        return realUser; 
    }

    async loginUser(){
        return "login"
    }
}
