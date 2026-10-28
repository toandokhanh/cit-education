import { Module } from '@nestjs/common';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from '../entities/lesson.entity';
import { Video } from '../entities/video.entity';
import { Language } from '../entities/language.entity';
import { Algorithm } from '../entities/algorithm.entity';
import { Course } from '../entities/course.entity';
import { InstructorStrategy } from '../strategy/instructor.strategy';
import { StudentStrategy } from '../strategy/student.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Video, Language, Algorithm, Course])],
  controllers: [LessonController],
  providers: [LessonService, InstructorStrategy, StudentStrategy]
})
export class LessonModule {}


// Lesson
// Video
// Language
// Algorithm
// Course
