import { IsEmail } from 'class-validator';
import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Course } from './course.entity';
import { Enrollment } from './enrollment.entity';
import { Blog } from './blog.entity';
import { Comment } from './comment.entity';

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

    @OneToMany(() => Blog, (blog) => blog.user)
    blogs: Blog[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @ManyToMany(() => Blog, (blog) => blog.likes)
    @JoinTable({ name: 'user_likes_blog' })
    likedBlogs: Blog[]; 

    @ManyToMany(() => Comment, (comment) => comment.likes)
    @JoinTable({ name: 'user_likes_comment' })
    likedComments: Comment[]; 

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
        if (!this.avatar) {
            this.avatar = 'https://localhost:3003/image/default_avt.png';
        }
    }
}
