

import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Video } from "./video.entity";
import { Course } from "./course.entity";
import { Enrollment } from "./enrollment.entity";
import { Comment } from "./comment.entity";


@Entity('lessons')
export class Lesson {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Video, video => video.lesson, { eager: true })
    video: Video;

    @ManyToOne(() => Course, course => course.lessons)
    course : Course;

    @OneToMany(() => Enrollment, enrollment => enrollment.lesson)
    enrollments: Enrollment[];

    @OneToMany(() => Comment, (comment) => comment.lesson, { eager: true })
    comments: Comment[];
}