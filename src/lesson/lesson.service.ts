import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Algorithm } from 'src/entitys/algorithm.entity';
import { Course } from 'src/entitys/course.entity';
import { Language } from 'src/entitys/language.entity';
import { Lesson } from 'src/entitys/lesson.entity';
import { Video } from 'src/entitys/video.entity';
import { Repository } from 'typeorm';

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


    async create(data : any): Promise<Lesson> {
        // simple check to make sure
        const course = await this.courserepository.findOne({where: {id: data.coursesId}})
        if (!course){
            throw new NotFoundException('Course not found !')
        }
        if (!course.lessons) {
            console.log('Lessons array is undefined for course:', course);
            }
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
        console.log('newVideo')
        console.log(newVideo)
        // create a new lesson
        const newLesson = await this.lessonrepository.save({
            title: data.title,
            content: data.content,
            video :newVideo 
        })
        console.log('newLesson')
        console.log(newLesson)
        // update a lesson in the course
        course.lessons.push(newLesson) /// nơi xảy ra lỗi
        await this.courserepository.save(course);
        return newLesson
    }
}
