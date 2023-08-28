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
  
  @ManyToOne(() => User, user => user.createdCourses)
  creator: User;

  @ManyToMany(() => User, user => user.courses)
  students: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  @OneToMany(() => Lesson, lesson => lesson.course, { eager: true })
  lessons: Lesson[];

}
