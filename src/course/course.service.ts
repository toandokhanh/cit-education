import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entitys/course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/createCourse.dto';
import { Category } from 'src/entitys/catetory.entity';
import { User } from 'src/entitys/user.entity';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Category) 
        private categoryRepository: Repository<Category>,
        @InjectRepository(User) 
        private userRepository: Repository<User>,
      ) {}

    async getAllCourses() {
        const courses = await this.courseRepository.find()
        return courses
    }
    
    async getDetailCourse(id: number): Promise<Course>{
        // const course = await this.courseRepository.findOne({where: {id}})
        const course = await this.courseRepository
            .createQueryBuilder('course')
            // .leftJoinAndSelect('course.category', 'category')
            // .leftJoinAndSelect('course.creator', 'course.students', 'user')
            .leftJoinAndSelect('course.category', 'category')
            .leftJoinAndSelect('course.creator', 'creator')
            .leftJoinAndSelect('course.students', 'students')
            .where('course.id = :id', { id: id })
            .getOne();
        if (!course) {
            throw new NotFoundException('Course not found');
        }
        return course;
    }

    async createCourse(course : any): Promise<Course[]>{
        const realeCourse = CreateCourseDto.plainToClass(course);
        const user = await this.userRepository.findOne({where : {id: realeCourse.creator}})
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const catetory = await this.categoryRepository.findOne({where: {id: realeCourse.category}})
        if (!catetory) {
            throw new NotFoundException('Catetory not found');
        }
        realeCourse.creator = user
        realeCourse.category = catetory
        const createCourse = this.courseRepository.create(realeCourse);
        return await this.courseRepository.save(createCourse);
    }



    async getCoursesBaseCate(id: number) {
        const catetory = await this.categoryRepository.findOne({where: {id}})
        if (!catetory) {
            throw new NotFoundException('Catetory not found');
        }
        const courses = await this.courseRepository.find({where : {
            category : {id: id}
        }})
        if (courses.length <= 0) {
            return {
                "message": "No related courses found",
            }
        }
        return {
            catetory,
            courses
        }
    }
}
