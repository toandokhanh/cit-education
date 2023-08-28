import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./catetory.entity";
import { User } from "./user.entity";
import { BaseDto } from "src/common/base.dto";

@Entity('courses')
export class Course extends BaseDto{
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
}
