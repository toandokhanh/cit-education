import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Course } from "./course.entity";


@Entity('enrollment')
export class Enrollment{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.enrollments)
    user: User;

    @ManyToOne(() => Course, course => course.enrollments)
    course: Course;   

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    enrollmentDate: Date;
}