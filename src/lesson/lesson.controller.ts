import { Controller, Post, Body, Param } from '@nestjs/common';
import { CreateLessonDTO } from './dto/createLesson.dto';

@Controller(':coursesId/lesson')
export class LessonController {



    @Post()
    async createLess(@Body() lesson : CreateLessonDTO,@Param('coursesId') coursesId: number){
        return {
            coursesId,
            lesson
        }
    }
}
