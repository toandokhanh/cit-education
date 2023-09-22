import { AuthGuard } from '@nestjs/passport';
import { EnrollmentService } from './enrollment.service';
import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { User } from 'src/user/decorator/user.decorator';

@Controller('enrollment')
export class EnrollmentController {
    constructor(
        private enrollmentService: EnrollmentService
    ){}


    @UseGuards(AuthGuard("student"))
    @Put('/:idCourse/:idLesson')
    async UpdateLessonInEnrollment(@Param('idCourse') idCourse: number, @Param('idLesson') idLesson: number, @User() user: any){
        return this.enrollmentService.UpdateLessonInEnrollment(idCourse,idLesson,user.userId)
    }


    @UseGuards(AuthGuard("student"))
    @Get('/:idCourse')
    async getLessonId(@Param('idCourse') idCourse: number, @User() user: any){
        return this.enrollmentService.getLessonId(idCourse,user.userId)
    }

}
