import { Course } from '../entitys/course.entity';
import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entitys/catetory.entity';
import { User } from 'src/entitys/user.entity';
import { Lesson } from 'src/entitys/lesson.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, User, Category, Lesson])
  ],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
