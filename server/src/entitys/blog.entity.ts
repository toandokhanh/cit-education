import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";


@Entity('blogs')
export class Blog{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.blogs, { eager: true })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.blog, { eager: true })
  comments: Comment[];


  @ManyToMany(() => User, (user) => user.likedBlogs, { eager: true })
  likes: User[]; 
}