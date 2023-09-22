import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

  @ManyToOne(() => User, (user) => user.blogs, { eager: true })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.blog)
  comments: Comment[];


  @ManyToMany(() => User, (user) => user.likedBlogs)
  likes: User[]; // Thêm trường likes để lưu danh sách người dùng đã "like" bài đăng
}