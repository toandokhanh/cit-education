import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Course } from './course.entity';
import { Lesson } from './lesson.entity';

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.courses)
  user: User;

  @ManyToOne(() => Course, course => course.enrollments)
  course: Course;

  @ManyToOne(() => Lesson, lesson => lesson.enrollments)
  lesson: Lesson;
}
