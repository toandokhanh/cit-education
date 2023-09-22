import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/entitys/blog.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateBlogDto } from './dto/createBlog.dto';
import { User } from 'src/entitys/user.entity';
import { UpdateBlogDto } from './dto/updateBlog.dto';

@Injectable()
export class BlogService {

    constructor(
        @InjectRepository(Blog)
        private readonly blogsResponse : Repository<Blog>,
        @InjectRepository(User)
        private readonly UsersResponse : Repository<User>,
    ){}

    async getAllBlogs(): Promise<Blog[]>{
        const blogs = await this.blogsResponse.find()
        if (!blogs){ 
            throw new NotFoundException('Blogs not found');
        }
        return blogs
    }


    async getBlogDetails(blogId: number): Promise<Blog>{ 
        const blog = await this.blogsResponse.findOne({where: {id: blogId}})
        if (!blog){ 
            throw new NotFoundException('Blog not found');
        }
        return blog
    }

    async createBlog(blog: any): Promise<Blog[]>{
        const realeData = CreateBlogDto.plainToClass(blog);
        const user = await this.UsersResponse.findOne({ where: {id: realeData.user}})
        if (!user){ 
            throw new NotFoundException('User not found');
        }
        realeData.user = user;
        const createBlog = this.blogsResponse.create(realeData)
        return await this.blogsResponse.save(createBlog)
    }

    async updateBlog(blogId: number, data: UpdateBlogDto, user: any): Promise<UpdateResult>{
        const writer = await this.UsersResponse.findOne({ where: {id: user.userId}})
        if (!writer){ 
            throw new NotFoundException('User not found');
        }
        const blog = await this.blogsResponse.findOne({where: {id: blogId, user: {id: writer.id}}})
        if (!blog){ 
            throw new NotFoundException('blog not found');
        }
        return await this.blogsResponse.update(blogId, data)
    }


    async deleteBlog (blogId: number, user: any): Promise<DeleteResult>{
        const blog = await this.blogsResponse.findOne({where: {id: blogId, user: {id: user.userId}}})
        if (!blog){ 
            throw new NotFoundException('blog not found');
        }
        return await this.blogsResponse.delete(blogId)
    }

    async likeBlog(blogId: number, userId: number): Promise<Blog> {
        const blog = await this.blogsResponse.findOne({ where: { id: blogId }, relations: ['likes'] });
        const user = await this.UsersResponse.findOne({ where: { id: userId } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
        if (!blog) {
          throw new NotFoundException('Blog not found');
        }
        // Kiểm tra xem người dùng đã "like" blog này chưa
        const userLiked = blog.likes.find((likedUser) => likedUser.id === userId);
        if (!userLiked) {
          blog.likes.push(user);
          await this.blogsResponse.save(blog);
        }
      
        return blog;
      }


      
      async unlikeBlog(blogId: number, userId: number): Promise<Blog> {
        const blog = await this.blogsResponse.findOne({ where: { id: blogId }, relations: ['likes'] });
        if (!blog) {
          throw new NotFoundException('Blog not found');
        }
        const user = await this.UsersResponse.findOne({ where: { id: userId } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
        // Kiểm tra xem người dùng đã "like" blog này chưa
        if (!blog.likes) {
          blog.likes = [];
        }
      
        const indexOfUser = blog.likes.findIndex((likedUser) => likedUser.id === userId);
        if (indexOfUser !== -1) {
          blog.likes.splice(indexOfUser, 1);
          await this.blogsResponse.save(blog);
        }
        return blog;
      }
      
}


