import { LessonService } from './lesson.service';
import { AuthGuard } from "@nestjs/passport";
import { Controller, Post, Body, Param, UseGuards, Get, BadRequestException, Delete, Put, InternalServerErrorException } from "@nestjs/common";
import { CreateLessonDTO } from "./dto/createLesson.dto";
import { User } from "src/user/decorator/user.decorator";
import { CreateSubtitleflaskApiUrl, UpdateSubtitleflaskApiUrl } from "./constant/constant";
import axios from "axios";
import { UpdateLessonDTO } from './dto/updateLesson.dto';

@Controller(":coursesId/lesson")
export class LessonController {
    constructor(
        private lessonService :LessonService
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
    const sourceLanguage = lesson.sourceLanguage;
    const targetLanguage = lesson.targetLanguage;
    const algorithm = lesson.algorithm;
    const flaskApiUrl = CreateSubtitleflaskApiUrl;
    try {
      const response = await axios.post(flaskApiUrl, {
        video,
        sourceLanguage,
        targetLanguage,
        algorithm,
      });
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
  async deleteLesson(@Param('idlesson') idlesson : number){
    return this.lessonService.deleteLesson(idlesson)
  }


  @UseGuards(AuthGuard("instructor"))
  @Put(':idlesson/update')
  async updateLesson(@Param('idlesson') idlesson : number,@Body() data: UpdateLessonDTO ){
    return this.lessonService.updateLesson(idlesson, data)
  }



  @UseGuards(AuthGuard("instructor"))
  @Post('updatesrtfile')
  async updateSubtitle(@Body() data: any) {
    try {
      const flaskUrl = UpdateSubtitleflaskApiUrl ; 
      await axios.post(flaskUrl, data);
      return { message: 'Subtitle updated successfully'};}
    catch (error) {
      console.error('Error updating subtitle:', error);
      throw new InternalServerErrorException('Subtitle update failed'); // Hoặc sử dụng exception phù hợp
    }
  }
}
