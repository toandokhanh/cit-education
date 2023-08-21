import { Controller, Get, Param, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')

export class CoursesController {
    constructor(
        private coursesService: CoursesService
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
