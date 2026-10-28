import { Repository } from 'typeorm';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entitys/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ILike } from 'typeorm';
import { Course } from 'src/entitys/course.entity';
import { Blog } from 'src/entitys/blog.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    private jwtService: JwtService
  ) {}


  // async findOne(condition: any): Promise<User> {
  //   return this.userRepository.findOne(condition);
  // }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.createQueryBuilder('user').addSelect('user.password').where('user.email = :email', { email }).getOne();
}

  async getUser(userId: number){
    const user = await this.userRepository.findOne({where: {id: userId}})
    if (!user) {
      throw new NotFoundException('User not found?');
    }
    return user;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async registerUser(data: any): Promise<any> {
    const savedUser = await this.userRepository.save(data);
    const { password, ...safeUser } = savedUser;
    return safeUser;
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
      const user = await this.userRepository.findOne({
        where: { email: ILike(`${email}@%`) },
        select: ["id", "email", "fullname", "gender", "role", "bio", "avatar", "createdAt", "updatedAt"]
      });
      const blogs = await this.blogRepository.find({where: {user: {id: user.id}}})
      if (user.role === 'instructor') {
        const courses = await this.courseRepository.find({where: {creator: {id: user.id}}});
        return {
          user,
          courses,
          blogs
        }
      }else {
        const courses = await this.courseRepository.find({where: {enrollments: {user: {id: user.id}}}})
        return {
          user,
          courses,
          blogs
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateUser(data: any, userId: number){
    // console.log(data);
    const user = await this.userRepository.findOne({where: {id: userId}})
    if (!user) {
      throw new NotFoundException('User not found?');
    }
    if(data.avatar){
      if (data.avatar !== user.avatar) {
        // console.log('changed avatar');
        user.avatar = `/images/${data.avatar}`;
      }
    }
    if(data.fullname){
      if(data.fullname !== user.fullname){
        // console.log('changed fullname');
        user.fullname = data.fullname;
      }
    }
    if(data.bio){
      if(data.bio !== user.bio){
        // console.log('changed bio');
        user.bio = data.bio;
      }
    }

    return await this.userRepository.save(user);
  }
}


