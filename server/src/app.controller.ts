import { randomUUID } from 'crypto';
import { User } from './user/decorator/user.decorator';
import { recordUpload } from './common/media';
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
      limits: { fileSize: 5 * 1024 * 1024, files: 1 },
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
      const newFileName = `${randomUUID()}${fileExtension}`;
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
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 256 * 1024 * 1024, files: 1 } }))
  async uploadVideo(@UploadedFile() file: Express.Multer.File, @User() user: any) {
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

      if (path.extname(file.originalname).toLowerCase() !== '.mp4' || file.buffer.length < 12 || file.buffer.toString('ascii', 4, 8) !== 'ftyp') {
        throw new HttpException('Only MP4 files are allowed', HttpStatus.BAD_REQUEST);
      }

      const newFileName = `${randomUUID()}${path.extname(file.originalname).toLowerCase()}`;
      const filePath = path.join(uploadDir, newFileName);

      fs.writeFileSync(filePath, file.buffer);
      recordUpload(newFileName, user.userId);
      return newFileName;
    } catch (error) {
      console.error(error);
      throw new HttpException('File upload failed.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  }
