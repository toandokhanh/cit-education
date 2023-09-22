import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/entitys/blog.entity';
import { Comment } from 'src/entitys/comment.entity';
import { User } from 'src/entitys/user.entity';
import { BlogController } from './blog.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog, Comment, User])
  ],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
