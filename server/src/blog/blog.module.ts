import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from '../entities/blog.entity';
import { Comment } from '../entities/comment.entity';
import { User } from '../entities/user.entity';
import { BlogController } from './blog.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog, Comment, User])
  ],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
