import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Blog } from './blog.entity';
import { Lesson } from './lesson.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ default: false })
  isCreator: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.likedComments, { eager: true }) // người like comment
  likes: User[]; 
  
  @ManyToOne(() => User, (user) => user.comments, { eager: true }) // người tạo comment
  user: User;

  @ManyToOne(() => Blog, (blog) => blog.comments)
  blog: Blog;

  @ManyToOne(() => Lesson, (lesson) => lesson.comments)
  lesson: Lesson;

}
