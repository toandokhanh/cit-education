import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./catetory.entity";
import { User } from "./user.entity";
import { Enrollment } from "./enrollment.entity";

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

  @OneToMany(() => Enrollment, enrollment => enrollment.course)
  enrollments: Enrollment[];
}
