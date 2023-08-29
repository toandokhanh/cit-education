import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Param, Post, Body, UseGuards, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { User } from 'src/user/decorator/user.decorator';
import { CreateCourseDto } from './dto/createCourse.dto';

@Controller('course')
export class CourseController {
    constructor(
        private coursesService: CourseService
    ) 
    {}


    @Get()
    async getAllCourses(){
        return await this.coursesService.getAllCourses()
    }



    @Get('/:id')
    async getDetailCourse(@Param('id') id: number){
        return await this.coursesService.getDetailCourse(id)
    }
    // đang fix bug
    @UseGuards(AuthGuard('instructor'))
    @Delete('/:idCourse/delete')
    async delete(@Param('idCourse') idCourse: number) {
      return this.coursesService.deleteCourse(idCourse);
    } 


    @UseGuards(AuthGuard('instructor'))
    @Post()
    async createCourse(@Body() course : CreateCourseDto, @User() user: any)
    {
        course.creator = user.userId
        return await this.coursesService.createCourse(course)
    }

    
    @UseGuards(AuthGuard('instructor'))
    @Get('v1/me')
    async getMyCourse(@User() user: any)
    {
        const userId = user.userId
        return await this.coursesService.getMyCourse(userId)
    }
    

    @Get('categories/:id')
    async getCoursesBaseCate(@Param('id') id: number){
        return await this.coursesService.getCoursesBaseCate(id)
    }


    @UseGuards(AuthGuard('student'))
    @Get(':idCourse/enrollment')
    async enrollCourse(@Param('idCourse') idCourse: number, @User() user: any){
        const idUser = user.userId
        return await this.coursesService.enrollCourse(idCourse, idUser)
    }


   
}
