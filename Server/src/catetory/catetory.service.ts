import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entitys/catetory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatetoryService {

    constructor(
        @InjectRepository(Category)
        private readonly cateResponse : Repository<Category>
    ){}

    async getCategorys(): Promise<Category[]> {
        return this.cateResponse.find()
    }
}
