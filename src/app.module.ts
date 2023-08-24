import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CoursesModule } from './courses/courses.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    UserModule, 
    CoursesModule, 
    ConfigModule.forRoot({isGlobal: true,}),
    DatabaseModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
