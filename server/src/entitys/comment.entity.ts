import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Blog } from './blog.entity';
import { Lesson } from './lesson.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ default: 0 }) 
  likeCount: number;
  
  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Blog, (blog) => blog.comments)
  blog: Blog;

  @ManyToOne(() => Lesson, (lesson) => lesson.comments)
  lesson: Lesson;

}
