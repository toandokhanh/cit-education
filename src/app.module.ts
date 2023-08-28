import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CourseModule } from './course/course.module';
import { CatetoryModule } from './catetory/catetory.module';
import { LessonModule } from './lesson/lesson.module';
import { VideoModule } from './video/video.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UserModule, 
    CourseModule, 
    ConfigModule.forRoot({isGlobal: true,}),
    DatabaseModule,
    CourseModule,
    CatetoryModule,
    LessonModule,
    VideoModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
