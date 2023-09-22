import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from 'src/entitys/enrollment.entity';
import { User } from 'src/entitys/user.entity';
import { Course } from 'src/entitys/course.entity';
import { Lesson } from 'src/entitys/lesson.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enrollment, User, Course, Lesson])
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService]
})
export class EnrollmentModule {}
