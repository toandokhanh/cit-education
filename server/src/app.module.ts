import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CourseModule } from './course/course.module';
import { CatetoryModule } from './catetory/catetory.module';
import { LessonModule } from './lesson/lesson.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LanguageModule } from './language/language.module';
import { AlgorithmModule } from './algorithm/algorithm.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
// import { BlogController } from './blog/blog.controller';
import { BlogModule } from './blog/blog.module';
// import { CommentController } from './comment/comment.controller';
import { CommentModule } from './comment/comment.module';
@Module({
  imports: [
    UserModule, 
    CourseModule, 
    ConfigModule.forRoot({isGlobal: true,}),
    DatabaseModule,
    CourseModule,
    CatetoryModule,
    LessonModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    LanguageModule,
    AlgorithmModule,
    EnrollmentModule,
    BlogModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
