import { Module } from '@nestjs/common';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from 'src/entitys/lesson.entity';
import { Video } from 'src/entitys/video.entity';
import { Language } from 'src/entitys/language.entity';
import { Algorithm } from 'src/entitys/algorithm.entity';
import { Course } from 'src/entitys/course.entity';
import { InstructorStrategy } from 'src/strategy/instructor.strategy';
import { StudentStrategy } from 'src/strategy/student.strategy';

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