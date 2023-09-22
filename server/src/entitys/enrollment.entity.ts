import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Lesson } from './lesson.entity';
import { Course } from './course.entity';
import { User } from './user.entity';

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn()
  courseid: number;

  @ManyToOne(() => Lesson, lesson => lesson.enrollments, { nullable: true, eager: true  })
  lesson: Lesson;

  @ManyToOne(() => Course, course => course.enrollments, { nullable: true, eager: true })
  course: Course;

  @ManyToOne(() => User, user => user.enrollments, { nullable: true, eager: true })
  user: User;
}
