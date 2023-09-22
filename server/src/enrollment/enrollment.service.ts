import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entitys/course.entity';
import { Enrollment } from 'src/entitys/enrollment.entity';
import { Lesson } from 'src/entitys/lesson.entity';
import { User } from 'src/entitys/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EnrollmentService {
    constructor(
        @InjectRepository(Enrollment)
        private readonly enrollmentResponse : Repository<Enrollment>,
        @InjectRepository(Course)
        private readonly courseResponse : Repository<Course>,
        @InjectRepository(User)
        private readonly userResponse : Repository<User>,
        @InjectRepository(Lesson)
        private readonly lessonResponse : Repository<Lesson>,
    ){}


    async UpdateLessonInEnrollment(idCourse: number, idLesson: any, idUser: number){
        
        // simple check
        const user = await this.userResponse.findOne({where : {id: idUser}})
        const course = await this.courseResponse.findOne({where : {id: idCourse}})
        const lesson = await this.lessonResponse.findOne({where : {id: idLesson}})
        if (!user || !course || !lesson) {
            throw new NotFoundException('Informations not found');
        }
        const enrollment = await this.enrollmentResponse.findOne({where: {user : {id: idUser}, course: {id: idCourse} }})
        const idEnrollment = enrollment.courseid
        return await this.enrollmentResponse.update(idEnrollment, {lesson, user, course})
    }



    // check xem student đã đăng ký khóa học chưa
    // nếu chưa trả về isEnrollment false
    // nếu rồi thì trả ra isEnrollment true và lessonid (bài học mà sinh viên đã học tới)
    async getLessonId(idCourse: number, idUser: number){
        // simple check
        const user = await this.userResponse.findOne({where : {id: idUser}})
        const course = await this.courseResponse.findOne({where : {id: idCourse}})
        if (!user || !course) {
            throw new NotFoundException('Informations not found');
        }
        const enrollment = await this.enrollmentResponse.findOne({where: {user : {id: idUser}, course: {id: idCourse} }})
        if (!enrollment) {
            return {
                isEnrollment: false
            }
        }
        return {
            lessonId : enrollment.lesson.id,
            isEnrollment: true
        }
    }
}
