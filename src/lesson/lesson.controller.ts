import { LessonService } from './lesson.service';
import { AuthGuard } from "@nestjs/passport";
import { Controller, Post, Body, Param, UseGuards } from "@nestjs/common";
import { CreateLessonDTO } from "./dto/createLesson.dto";
import { User } from "src/user/decorator/user.decorator";
import { CreateSubtitleflaskApiUrl } from "./constant/constant";
import axios from "axios";

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
  @Post()
  async createLess(
    @Body() lesson: CreateLessonDTO,
    @Param("coursesId") coursesId: number,
    @User() user: any,
  ) {
    const folder = user.email.split("@")[0];
    const title = lesson.title;
    const content = lesson.content;
    const video = lesson.video;
    const sourceLanguage = lesson.sourceLanguage;
    const targetLanguage = lesson.targetLanguage;
    const algorithm = lesson.algorithm;
    const flaskApiUrl = CreateSubtitleflaskApiUrl;
    try {
      const response = await axios.post(flaskApiUrl, {
        folder,
        video,
        sourceLanguage,
        targetLanguage,
        algorithm,
      });
      return await this.lessonService.create(
        {
            coursesId,
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
}
