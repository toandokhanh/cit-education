import { Injectable } from '@nestjs/common';

@Injectable()
export class CoursesService {
    async getAllCourses(){
        return 'Get all courses';
    }
    
    async getDetailCourse(id){
        return `Get Detail course ${id}`;
    }

    async createCourse(){
        return 'Create new Course';
    }
}
