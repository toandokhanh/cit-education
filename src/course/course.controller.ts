import { Controller, Get, Param, Post } from '@nestjs/common';
import { CourseService } from './course.service';

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

    @Get('/:id')
    async getDetailCourse(@Param('id') id: number){
        return await this.coursesService.getDetailCourse(id)
    }

    @Post()
    async createCourse()
    {
        return await this.coursesService.createCourse()
    }

}
