import { Controller, Get, UseInterceptors, Post, UploadedFile, UseGuards, HttpException, HttpStatus} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { AuthGuard } from '@nestjs/passport';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard("jwt"))
  @Post('upload/image')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file uploaded.', HttpStatus.BAD_REQUEST);
    }
    try {
      const uploadDir = path.join(__dirname, '..', 'public', 'images'); 
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const fileExtension = path.extname(file.originalname);
      const newFileName = `${Date.now()}${fileExtension}`;
      const filePath = path.join(uploadDir, newFileName);
      fs.writeFileSync(filePath, file.buffer);

      return newFileName;
    } catch (error) {
      console.error(error);
      return 'File upload failed.';
    }
  }


  @UseGuards(AuthGuard("jwt"))
  @Post('upload/video')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    // Kiểm tra xem có file được tải lên không
    if (!file) {
      throw new HttpException('No file uploaded.', HttpStatus.BAD_REQUEST);
    }
    try {
      // const userName = user.email.split('@')[0];
      // const projectRootPath = path.join(__dirname, '..');
      // const publicFolderPath = path.join(projectRootPath, 'public');
      // const userFolderPath = path.join(publicFolderPath, userName);
      const uploadDir = path.join(__dirname, '..', 'public', 'videos'); 
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      if (path.extname(file.originalname).toLowerCase() !== '.mp4') {
        throw new HttpException('Only MP4 files are allowed', HttpStatus.BAD_REQUEST);
      }

      const newFileName = `${Date.now()}${path.extname(file.originalname)}`;
      const filePath = path.join(uploadDir, newFileName);

      fs.writeFileSync(filePath, file.buffer);
      return newFileName;
    } catch (error) {
      console.error(error);
      throw new HttpException('File upload failed.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  }
