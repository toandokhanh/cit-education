import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entitys/comment.entity';
import { CommentController } from './comment.controller';
import { Lesson } from 'src/entitys/lesson.entity';
import { Blog } from 'src/entitys/blog.entity';
import { User } from 'src/entitys/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Blog, Lesson, User])
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
