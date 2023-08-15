import { Controller, Get } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')

export class CoursesController {
    constructor(
        private coursesService: CoursesService
    ) 
    {

    }
    @Get()
    async getCourses(){
        return await this.coursesService.getCourse()
    }
}
