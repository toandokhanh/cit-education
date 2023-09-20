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
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entitys/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ILike } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
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

  async registerUser(data: any): Promise<any> {
    const savedUser = await this.userRepository.save(data);
    return savedUser;
  }

  async loginUser(user: any) {
    const checkUser = await this.findOneByEmail(user.email);
        // check email
        if (!checkUser) {
            throw new ConflictException('invalid credentials');
        }
        // check password
        if (!await bcrypt.compare(user.password, checkUser.password)) {
            throw new BadRequestException('invalid credentials');
        }
        const jwt = await this.jwtService.signAsync({
          id : checkUser.id, 
          role: checkUser.role, 
          email: checkUser.email,
          fullname: checkUser.fullname,
          avatart: checkUser.avatar,
        })
        return {
          accessToken: jwt,
      }
  }


  async getUserDetails(email: string){
    try {
      console.log(email);
      const user = await this.userRepository.findOne({  
        where: { email: ILike(`%${email}%`) },
        select: ["id", "email", "fullname", "gender", "role", "createdAt", "updatedAt"]
      });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
