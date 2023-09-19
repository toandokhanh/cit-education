import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Algorithm } from 'src/entitys/algorithm.entity';
import { Course } from 'src/entitys/course.entity';
import { Language } from 'src/entitys/language.entity';
import { Lesson } from 'src/entitys/lesson.entity';
import { Video } from 'src/entitys/video.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson)
        private readonly lessonrepository: Repository<Lesson>,
        @InjectRepository(Video)
        private readonly videorepository: Repository<Video>,
        @InjectRepository(Language)
        private readonly languagerepository: Repository<Language>,
        @InjectRepository(Algorithm)
        private readonly algorithmrepository: Repository<Algorithm>,
        @InjectRepository(Course)
        private readonly courserepository: Repository<Course>
    ){}

    async findLessonInCourse(lessonId: number) {

        const lesson = await this.lessonrepository.findOne(
            { where: { id: String(lessonId) } }, 
        );
        
        if (!lesson) {
            throw new NotFoundException('lesson not found');
        }
        return lesson
    }

    async findLessons(coursesId: number): Promise<Lesson[]> {

        const course = await this.courserepository.findOne({where: {id: coursesId}})
        console.log(course)
        if (!course){
            throw new NotFoundException(`Course not found`)
        }
        return course.lessons;
    }


    async findCourse(coursesId: number)
    {
        const course = await this.courserepository.findOne({where: {id: coursesId}})
        if (!course){
            throw new NotFoundException('Course not found !')
        }
        return course
    }


    async create(data : any): Promise<any> {
        // simple check to make sure
        const algorithm = await this.algorithmrepository.findOne({where: {idUnit: data.algorithm}})
        const sourceLanguage = await this.languagerepository.findOne({where: {idUnit: data.sourceLanguage}})
        const targetLanguage = await this.languagerepository.findOne({where: {idUnit: data.targetLanguage}})
        if (!algorithm || !sourceLanguage || !targetLanguage){
            throw new NotFoundException('Data not found !')
        }
        
        // create a new video
        const newVideo = await this.videorepository.save({
            pathMP4: data.videoPath,
            pathSRT: data.srtPath,
            pathTXT: data.txtPath,
            algorithm,
            sourceLanguage,
            targetLanguage,
            outputPathMP4: data.outputVideoPath,
            pathWAV:data.wavPath,
            outputPathWAV: data.outputWavPath
        })
        // create a new lesson
        const newLesson = await this.lessonrepository.save({
            title: data.title,
            content: data.content,
            video :newVideo
        })
       
        data.course.lessons.push(newLesson);
        await this.courserepository.save(data.course);
        return {
            id: data.course.id,
            title: newLesson.title
        }
    }

    async updateLesson(idLesson : number, data: any): Promise<UpdateResult> {
        return await this.lessonrepository.update(idLesson, data);
    }


    async deleteLesson(idLesson : number): Promise<DeleteResult> {
        return await this.lessonrepository.delete(idLesson);
    }

}
