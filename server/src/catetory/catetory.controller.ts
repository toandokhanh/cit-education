import { CatetoryService } from './catetory.service';
import { Controller, Get } from '@nestjs/common';

@Controller('catetory')
export class CatetoryController {


    constructor(
        private catetoryService: CatetoryService
    ){}

  @Get()
  async getCategorys(){
    return await this.catetoryService.getCategorys()
  }


}
