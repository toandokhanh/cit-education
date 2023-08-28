

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./video.entity";
import { Course } from "./course.entity";




@Entity('lessons')
export class Lesson {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(() => Video, video => video.lesson)
    video: Video;

    @OneToMany(() => Course, course => course.lesson)
    course : Course;
}