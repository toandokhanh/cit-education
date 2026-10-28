import { CategoryService } from './category.service';
import { Controller, Get } from '@nestjs/common';

@Controller(['categories', 'catetory'])
export class CategoryController {


    constructor(
        private categoryService: CategoryService
    ){}

  @Get()
  async getCategories(){
    return await this.categoryService.getCategories()
  }


}
