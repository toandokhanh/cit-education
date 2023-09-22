import { AuthGuard } from '@nestjs/passport';
import { BlogService } from './blog.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards,  } from '@nestjs/common';
import { CreateBlogDto } from './dto/createBlog.dto';
import { User } from 'src/user/decorator/user.decorator';
import { UpdateBlogDto } from './dto/updateBlog.dto';

@Controller('blog')
export class BlogController {
    constructor(
        private blogService: BlogService
    ){}


    // get all blogs
    @Get()
    async getAllBlogs(){
        return await this.blogService.getAllBlogs();
    }

    // get deltail blog
    @Get('/:blogId/details')
    async getBlogDetails(@Param('blogId') blogId: number){
        return await this.blogService.getBlogDetails(blogId);
    }

    // create blog
    @UseGuards(AuthGuard("jwt"))
    @Post('/create')
    async createBlog(@Body() blog: CreateBlogDto, @User() user: any){
        blog.user = user.userId;
        return await this.blogService.createBlog(blog);
    }

    // update blog
    @UseGuards(AuthGuard("jwt"))
    @Put('/:blogId/update')
    async updateBlog(@Param('blogId') blogId: number, @Body() data: UpdateBlogDto, @User() user: any){
        return await this.blogService.updateBlog(blogId, data, user);
    }


    // delete blog
    @UseGuards(AuthGuard("jwt"))
    @Delete('/:blogId/delete')
    async deleteBlog(@Param('blogId') blogId: number, @User() user: any){
        return await this.blogService.deleteBlog(blogId, user);
    }


    // like blog
    @UseGuards(AuthGuard('jwt'))
    @Post('/:blogId/like')
    async likeBlog(@Param('blogId') blogId: number, @User() user: any) {
        return this.blogService.likeBlog(blogId, user.userId);
    }

    // unlike blog
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:blogId/unlike')
    async unlikeBlog(@Param('blogId') blogId: number, @User() user: any) {
        return this.blogService.unlikeBlog(blogId, user.userId);
    }
}
