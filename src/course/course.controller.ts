import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { User } from 'src/user/decorator/user.decorator';
import { CreateCourseDto } from './dto/createCourse.dto';

@Controller('course')
export class CourseController {
    constructor(
        private coursesService: CourseService
    ) 
    {

    }


    @Get()
    async getAllCourses(){
        return await this.coursesService.getAllCourses()
    }



    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    async getDetailCourse(@Param('id') id: number){
        return await this.coursesService.getDetailCourse(id)
    }



    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createCourse(@Body() course : CreateCourseDto, @User() user: any)
    {
        course.creator = user.userId
        return await this.coursesService.createCourse(course)
    }


    
    @UseGuards(AuthGuard('jwt'))
    @Get('categories/:id')
    async getCoursesBaseCate(@Param('id') id: number){
        return await this.coursesService.getCoursesBaseCate(id)
    }



}
