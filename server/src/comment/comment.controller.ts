import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/decorator/user.decorator';
import { CreateCommentDto } from './dto/createComment.dto';

@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService){}

    // create a new comment for the blog
    @UseGuards(AuthGuard("jwt"))
    @Post('/blog/:blogId/create')
    async createBlogComment(
        @User() user: any,
        @Body() commentContent: CreateCommentDto,
        @Param('blogId') blogId: number
        ){
        const userId : number = user.userId
        return await this.commentService.createBlogComment(userId, blogId, commentContent)
    }


    // create a new comment for the lesson
    @UseGuards(AuthGuard("jwt"))
    @Post('/lesson/:lessonId/create')
    async createLessonComment(
        @User() user: any,
        @Body() commentContent: CreateCommentDto,
        @Param('lessonId') lessonId: any
        ){
        const userId : number = user.userId
        return await this.commentService.createLessonComment(userId, lessonId, commentContent)
    }



    // update comments 
    @UseGuards(AuthGuard("jwt"))
    @Put('/:commentId/update')
    async updateComment(
        @User() user: any, 
        @Body() commentContent: CreateCommentDto,
        @Param('commentId') commentId: number
        ){
        const userId : number = user.userId
        return await this.commentService.updateComment(userId, commentId, commentContent)
    }

    // delete comments 
    @UseGuards(AuthGuard("jwt"))
    @Delete('/:commentId/delete')
    async deleteComment(
        @User() user: any, 
        @Param('commentId') commentId: number
        ){
            const userId : number = user.userId
            return await this.commentService.deleteComment(userId, commentId)
    }

    // like the comment 
    @UseGuards(AuthGuard('jwt'))
    @Post('/:commentId/like')
    async likeBlog(@Param('commentId') commentId: number, @User() user: any) {
        return this.commentService.likeComment(commentId, user.userId);
    }

    // unlike the comment 
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:commentId/unlike')
    async unlikeBlog(@Param('commentId') commentId  : number, @User() user: any) {
        return this.commentService.unlikeComment(commentId, user.userId);
    }

}
