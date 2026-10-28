import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { CommentController } from './comment.controller';
import { Lesson } from '../entities/lesson.entity';
import { Blog } from '../entities/blog.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Blog, Lesson, User])
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
