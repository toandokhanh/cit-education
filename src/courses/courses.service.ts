import { Injectable } from '@nestjs/common';

@Injectable()
export class CoursesService {
    async getCourse(){
        return 'course';
    }
}
