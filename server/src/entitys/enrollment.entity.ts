import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Lesson } from './lesson.entity';

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lesson, lesson => lesson.enrollments)
  lesson: Lesson;
}
