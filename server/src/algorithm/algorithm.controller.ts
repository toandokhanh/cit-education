import { Controller, Get } from '@nestjs/common';
import { AlgorithmService } from './algorithm.service';

@Controller('algorithm')
export class AlgorithmController {

    constructor(private algorithmService: AlgorithmService){}

    @Get()
    async getCategories(){
        return await this.algorithmService.getAlgorithms()
    }
}
