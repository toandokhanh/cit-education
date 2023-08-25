import { Course } from './../entitys/course.entity';
import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course])
  ],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
