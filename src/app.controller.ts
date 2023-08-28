import { Controller, Get, UseInterceptors, Post, UploadedFile, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user/decorator/user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @User() user: any) {
    // lấy ra email đặt tên cho thư mục trong public forder
    const userName = user.email.split('@')[0];
    const projectRootPath = path.join(__dirname, '..');
    const publicFolderPath = path.join(projectRootPath, 'public');
    const userFolderPath = path.join(publicFolderPath, userName);
    const doesUserFolderExist = fs.existsSync(userFolderPath);
    if (doesUserFolderExist) {
      console.log(`folder at ${userFolderPath}`);
    } else {
      // Tạo thư mục nếu chưa tồn tại
      fs.mkdirSync(userFolderPath);
      console.log(`folder saved at ${userFolderPath}.`);
    }

    if (path.extname(file.originalname).toLowerCase() !== '.mp4') {
      throw new HttpException('Only MP4 files are allowed', HttpStatus.BAD_REQUEST);
    }

    const savePath = path.join(__dirname, '..', 'public', file.originalname);
    console.log('File saved at:', savePath);
    return 1
  }
}
