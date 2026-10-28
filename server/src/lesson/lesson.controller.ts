import { LessonService } from './lesson.service';
import { AuthGuard } from "@nestjs/passport";
import { Controller, Post, Body, Param, UseGuards, Get, BadRequestException, Delete, Put, InternalServerErrorException } from "@nestjs/common";
import { CreateLessonDTO } from "./dto/createLesson.dto";
import { User } from "src/user/decorator/user.decorator";
import { workerUrl } from "./constant/constant";
import axios from "axios";
import { ConfigService } from '@nestjs/config';
import { UpdateSubtitleDTO } from './dto/updateSubtitle.dto';
import { assertOwnedUpload } from '../common/media';
import { UpdateLessonDTO } from './dto/updateLesson.dto';

@Controller(":coursesId/lesson")
export class LessonController {
    constructor(
        private lessonService :LessonService,
        private config: ConfigService
    ){}

  handleFilePath(file: any) {
    const parts = file.split("/");
    const filePath = "/" + parts.slice(-2).join("/"); // Lấy 2 phần tử cuối cùng và nối lại
    return filePath;
  }


  @UseGuards(AuthGuard("jwt"))
  @Get()
  async getAllLessons(@Param("coursesId") coursesId: number){
    return await this.lessonService.findLessons(coursesId)
  }



  @UseGuards(AuthGuard("jwt"))
  @Get('/:lessonId')
  async getLessonDetails(
    @Param("lessonId") lessonId: number
    )
  {
    return await this.lessonService.findLessonInCourse(lessonId)
  }


  @UseGuards(AuthGuard("instructor"))
  @Post()
  async createLess(
    @Body() lesson: CreateLessonDTO, // lesson information
    @Param("coursesId") coursesId: number, // course ID
    @User() user: any, // creator
  ) {
    const course = await this.lessonService.findCourse(coursesId)
    if(course.creator.email !== user.email){
      throw new BadRequestException('You do not have access')
    }
    // const folder = user.email.split("@")[0];
    const title = lesson.title;
    const content = lesson.content;
    const video = lesson.video;
    assertOwnedUpload(video, user.userId);
    const sourceLanguage = lesson.sourceLanguage;
    const targetLanguage = lesson.targetLanguage;
    const algorithm = lesson.algorithm;
    const flaskApiUrl = workerUrl('createSubtitle');
    try {
      const response = await axios.post(flaskApiUrl, {
        video,
        sourceLanguage,
        targetLanguage,
        algorithm,
      }, { headers: { 'X-Service-Token': this.config.getOrThrow('FLASK_SERVICE_TOKEN') }, timeout: 1800000 });

      return await this.lessonService.create(
        {
            course,
            title,
            content,
            algorithm,
            sourceLanguage,
            targetLanguage,
            outputVideoPath: this.handleFilePath(response.data.outputVideoPath),
            outputWavPath: this.handleFilePath(response.data.outputWavPath),
            srtPath: this.handleFilePath(response.data.srtPath),
            txtPath: this.handleFilePath(response.data.txtPath),
            videoPath: this.handleFilePath(response.data.videoPath),
            wavPath: this.handleFilePath(response.data.wavPath),
          }
      )
    } catch (error) {
      if (error.response) {
        console.log("Response Error:", error.response.data);
      } else if (error.request) {
        console.log("Request Error:", error.request);
      } else {
        console.log("Error:", error.message);
      }
      throw error;
    }
  }

  @UseGuards(AuthGuard("instructor"))
  @Delete(':idlesson/delete')
  async deleteLesson(@Param('idlesson') idlesson : number, @User() user: any){
    return this.lessonService.deleteLesson(idlesson, user.userId)
  }


  @UseGuards(AuthGuard("instructor"))
  @Put(':idlesson/update')
  async updateLesson(@Param('idlesson') idlesson : number,@Body() data: UpdateLessonDTO, @User() user: any ){
    return this.lessonService.updateLesson(idlesson, data, user.userId)
  }



  @UseGuards(AuthGuard("instructor"))
  @Post('updatesrtfile')
  async updateSubtitle(@Body() data: UpdateSubtitleDTO, @User() user: any) {
    const lesson = await this.lessonService.ownedLesson(String(data.lessonId), user.userId);
    const response = await axios.post(workerUrl('updateSubtitle'), {
      pathMP4: lesson.video.pathMP4,
      pathSRT: lesson.video.pathSRT,
      data: data.data,
    }, { headers: { 'X-Service-Token': this.config.getOrThrow('FLASK_SERVICE_TOKEN') }, timeout: 1800000 });
    return response.data;
  }
}
