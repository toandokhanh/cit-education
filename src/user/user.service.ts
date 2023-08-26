// import { EntityManager } from 'typeorm';
// // import { plainToClass } from 'class-transformer';
// import { Injectable } from '@nestjs/common';
// import { UserDTO } from './dto/user.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from '../entitys/user.entity';
// @Injectable()
// export class UserService {
//     constructor(
//         @InjectRepository(User)
//         private readonly entityManager: EntityManager,
//       ) {}


//       async getUsers(): Promise<User[]> {
//         // Sử dụng EntityManager để truy vấn tất cả người dùng từ cơ sở dữ liệu
//         const users = await this.entityManager.find(User);
//         return users;
//     }

    
//     async registerUser(user: UserDTO){
//         const realUser = UserDTO.plainToClass(user);
//         console.log('realUser.email')
//         console.log(realUser.email)
//         const userFinal = new User(realUser)
//         await this.entityManager.save(userFinal);
//         return userFinal; 
//     }

//     async loginUser(){
//         return "login"
//     }
// }




import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entitys/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  // async findOne(condition: any): Promise<User> {
  //   return this.userRepository.findOne(condition);
  // }
  
  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
}


  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async registerUser(data: any): Promise<User> {
    const savedUser = await this.userRepository.save(data);
    return savedUser;

    
  }

  // async loginUser() {
  //   return 'login';
  // }
}
