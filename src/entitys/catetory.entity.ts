import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity('catetorys')
export class Category{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Course, course => course.category)
    courses: Course[];
}