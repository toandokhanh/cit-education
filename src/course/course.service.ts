import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entitys/course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/createCourse.dto';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly userRepository: Repository<Course>,
      ) {}

    async getAllCourses(): Promise<Course[]> {
        const courses = await this.userRepository.find()
        return courses
    }
    
    async getDetailCourse(id){
        return `Get Detail course ${id}`;
    }

    async createCourse(course : CreateCourseDto): Promise<Course>{
        const realeCourse = CreateCourseDto.plainToClass(course);
        // xử lý userID ở đây
        const newCourse = this.userRepository.create(realeCourse)
        const savedCourse = await this.userRepository.save(newCourse)
        return savedCourse
    }
}
