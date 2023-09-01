import { Controller, Get, UseGuards } from '@nestjs/common';
import { AlgorithmService } from './algorithm.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('algorithm')
export class AlgorithmController {

    constructor(private algorithmService: AlgorithmService){}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getCategorys(){
        return await this.algorithmService.getAlgorithms()
    }
}
