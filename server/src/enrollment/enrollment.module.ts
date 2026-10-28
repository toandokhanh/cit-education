import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from '../entities/enrollment.entity';
import { User } from '../entities/user.entity';
import { Course } from '../entities/course.entity';
import { Lesson } from '../entities/lesson.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enrollment, User, Course, Lesson])
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService]
})
export class EnrollmentModule {}
