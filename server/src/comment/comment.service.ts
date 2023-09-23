import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/entitys/blog.entity';
import { Comment } from 'src/entitys/comment.entity';
import { Lesson } from 'src/entitys/lesson.entity';
import { User } from 'src/entitys/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateCommentDto } from './dto/createComment.dto';

@Injectable()
export class CommentService {
    
    constructor(
        @InjectRepository(Comment)
        private readonly commentsResponse : Repository<Comment>,
        @InjectRepository(User)
        private readonly usersResponse : Repository<User>,
        @InjectRepository(Blog)
        private readonly blogsResponse : Repository<Blog>,
        @InjectRepository(Lesson)
        private readonly lessonsResponse : Repository<Lesson>,
    ){}


    async createBlogComment(userId: number, blogId: number, commentContent: CreateCommentDto): Promise<Blog>{

        // check user
        const user = await this.usersResponse.findOne({where: {id: userId}})
        const blog = await this.blogsResponse.findOne({where: {id: blogId}})
        if (!user || !blog){ 
            throw new NotFoundException('Informations not found');
        }
        const findBlogCreater = await this.blogsResponse.findOne({where: {user : {id: userId}}})
        if(findBlogCreater){
            const comment = this.commentsResponse.create({
                content: commentContent.content,
                user: user,
                isCreator: true
            })
            await this.commentsResponse.save(comment)
            blog.comments.push(comment)
            return await this.blogsResponse.save(blog)
        }else{
            const comment = this.commentsResponse.create({
                content: commentContent.content,
                user: user
            })
            await this.commentsResponse.save(comment)
            blog.comments.push(comment)
            return await this.blogsResponse.save(blog)
        }
    }


    
    async createLessonComment(userId: number, lessonId: any, commentContent: CreateCommentDto): Promise<Lesson>{
        // check 
        const user = await this.usersResponse.findOne({where: {id: userId}})
        const lesson = await this.lessonsResponse.findOne({where: {id: lessonId}})
        if (!user || !lesson){ 
            throw new NotFoundException('Informations not found');
        }
        const findLessonCreater = await this.lessonsResponse.findOne({where: {course: {creator: {id: userId}}}})
        if(findLessonCreater){
            const comment = this.commentsResponse.create({
                content: commentContent.content,
                user: user,
                isCreator: true
            })
            await this.commentsResponse.save(comment)
            lesson.comments.push(comment)
            return await this.lessonsResponse.save(lesson)
        }else{
            const comment = this.commentsResponse.create({
                content: commentContent.content,
                user: user
            })
            await this.commentsResponse.save(comment)
            lesson.comments.push(comment)
            return await this.lessonsResponse.save(lesson)
        }
    }


    async updateComment(userId: number, commentId: number, commentContent: CreateCommentDto): Promise<UpdateResult>{

        const user = await this.usersResponse.findOne({where: {id: userId}})
        const comment = await this.commentsResponse.findOne({where: {id: commentId, user: {id: userId}}})
        if (!user || !comment){ 
            throw new NotFoundException('Informations not found');
        }
        return await this.commentsResponse.update(comment, {content: commentContent.content})
    }


    async deleteComment(userId: number, commentId: number): Promise<DeleteResult>{
        const user = await this.usersResponse.findOne({where: {id: userId}})
        const comment = await this.commentsResponse.findOne({where: {id: commentId, user: {id: userId}}})
        if (!user || !comment){ 
            throw new NotFoundException('Informations not found');
        }
        return await this.commentsResponse.delete(comment)
    }

    
    async likeComment(commentId: number, userId: number): Promise<Comment> {
        const comment = await this.commentsResponse.findOne({ where: { id: commentId }, relations: ['likes'] });
        const user = await this.usersResponse.findOne({ where: { id: userId } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
        if (!comment) {
          throw new NotFoundException('Comment not found');
        }
        // Kiểm tra xem người dùng đã "like" comment này chưa
        const userLiked = comment.likes.find((likedUser) => likedUser.id === userId);
        if (!userLiked) {
          comment.likes.push(user);
          await this.commentsResponse.save(comment);
        }
      
        return comment;
      }


      
      async unlikeComment(commentId: number, userId: number): Promise<Comment> {
        const comment = await this.commentsResponse.findOne({ where: { id: commentId }, relations: ['likes'] });
        if (!comment) {
          throw new NotFoundException('Comment not found');
        }
        const user = await this.usersResponse.findOne({ where: { id: userId } });
        if (!user) {
          throw new NotFoundException('Comment not found');
        }
        // Kiểm tra xem người dùng đã "like" comment này chưa
        if (!comment.likes) {
          comment.likes = [];
        }
      
        const indexOfUser = comment.likes.findIndex((likedUser) => likedUser.id === userId);
        if (indexOfUser !== -1) {
          comment.likes.splice(indexOfUser, 1);
          await this.commentsResponse.save(comment);
        }
        return comment;
      }
      
}

