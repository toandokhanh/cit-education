import { IsEmail } from 'class-validator';
import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Course } from './course.entity';
import { Enrollment } from './enrollment.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true }) 
    @IsEmail()
    email: string;

    @Column()
    fullname: string;

    @Column()
    password: string;

    @Column()
    gender: string;

    @Column({ default: 'https://localhost:3003/image/default_avt.png' })
    avatar: string;

    @Column({ nullable: true }) // Đặt nullable: true cho trường dob
    dob: Date;

    @Column()
    role: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Course, course => course.students)
    @JoinTable({name: 'enrollments1'})
    courses: Course[];

    @OneToMany(() => Course, course => course.creator)
    createdCourses: Course[];


    @OneToMany(() => Enrollment, enrollment => enrollment.user)
    enrollments: Enrollment[];

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
        if (!this.avatar) {
            this.avatar = 'https://localhost:3003/image/default_avt.png';
        }
    }
}
