import { Injectable } from '@nestjs/common';

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

    async registerUser(){
        return "register"
    }

    async loginUser(){
        return "login"
    }
}
