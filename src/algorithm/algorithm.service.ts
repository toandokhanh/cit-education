import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Algorithm } from 'src/entitys/algorithm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlgorithmService {

    constructor(
        @InjectRepository(Algorithm)
        private algorithmRepository: Repository<Algorithm>
    ){}
    
    async getAlgorithms(): Promise<Algorithm[]> {
        return this.algorithmRepository.find()
    }
}
