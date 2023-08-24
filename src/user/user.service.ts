import { EntityManager } from 'typeorm';
// import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entitys/user.entity';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly entityManager: EntityManager
      ) {}


      async getUsers(): Promise<User[]> {
        // Sử dụng EntityManager để truy vấn tất cả người dùng từ cơ sở dữ liệu
        const users = await this.entityManager.find(User);

        return users;
    }

    
    async registerUser(user: UserDTO) {
        // test hackcode 
        // user.id = 1;
        user.createdAt = new Date();
        user.updatedAt = new Date();
        user.dob = new Date();
        const realUser = UserDTO.plainToClass(user);
        const userFinal = new User(realUser)
        await this.entityManager.save(userFinal);
        return userFinal; 
    }

    async loginUser(){
        return "login"
    }
}
