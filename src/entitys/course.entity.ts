import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./catetory.entity";
import { User } from "./user.entity";
import { Lesson } from "./lesson.entity";

@Entity('courses')
export class Course{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, category => category.courses)
  category: Category;
  
  @ManyToOne(() => User, user => user.createdCourses, { eager: true })
  creator: User;

  @ManyToMany(() => User, user => user.courses,  { eager: true })
  students: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  @OneToMany(() => Lesson, lesson => lesson.course, { cascade: true, eager: true })
  lessons: Lesson[];

}
