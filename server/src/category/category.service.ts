import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private readonly cateResponse : Repository<Category>
    ){}

    async getCategories(): Promise<Category[]> {
        return this.cateResponse.find()
    }
}
