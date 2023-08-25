import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CourseModule } from './course/course.module';
import { CatetoryModule } from './catetory/catetory.module';
import { EnrollmentModule } from './enrollment/enrollment.module';

@Module({
  imports: [
    UserModule, 
    CourseModule, 
    ConfigModule.forRoot({isGlobal: true,}),
    DatabaseModule,
    CourseModule,
    CatetoryModule,
    EnrollmentModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
