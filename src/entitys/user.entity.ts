import { IsEmail } from 'class-validator';
import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Course } from './course.entity';
import { Enrollment } from './enrollment.entity';

@Entity('user')
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

    @Column({ default: 'https://localhost:3002/image/default_avt.png' })
    avatar: string;

    @Column({ nullable: true }) // Đặt nullable: true cho trường dob
    dob: Date;

    @Column()
    role: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


    // @ManyToMany(() => Course, course => course.users)
    // @JoinTable()
    // courses: Course[];

    @OneToMany(() => Course, course => course.creator)
    createdCourses: Course[];

    @OneToMany(() => Enrollment, enrollment => enrollment.user)
    enrollments: Enrollment[];

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
        if (!this.avatar) {
            this.avatar = 'https://localhost:3002/image/default_avt.png';
        }
    }
}
