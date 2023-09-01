import { CatetoryService } from './catetory.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('catetory')
export class CatetoryController {


    constructor(
        private catetoryService: CatetoryService
    ){}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCategorys(){
    return await this.catetoryService.getCategorys()
  }


}
