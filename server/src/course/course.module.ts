import { Course } from '../entities/course.entity';
import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { User } from '../entities/user.entity';
import { Lesson } from '../entities/lesson.entity';
import { Enrollment } from '../entities/enrollment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, User, Category, Lesson, Enrollment])
  ],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
