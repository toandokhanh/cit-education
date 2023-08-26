import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./catetory.entity";
import { User } from "./user.entity";

@Entity('course')
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

}
