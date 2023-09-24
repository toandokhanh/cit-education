import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Lesson } from './lesson.entity';
import { Course } from './course.entity';
import { User } from './user.entity';

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn()
  courseid: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  @ManyToOne(() => Lesson, lesson => lesson.enrollments, { nullable: true, eager: true  })
  lesson: Lesson;

  @ManyToOne(() => Course, course => course.enrollments, { nullable: true, eager: true })
  course: Course;

  @ManyToOne(() => User, user => user.enrollments, { nullable: true, eager: true })
  user: User;
}
