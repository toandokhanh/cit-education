import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    async getUser(){
        return 'xin chao service'
    }
}
