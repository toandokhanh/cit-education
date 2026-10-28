import { Module } from '@nestjs/common';
import { AlgorithmController } from './algorithm.controller';
import { AlgorithmService } from './algorithm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Algorithm } from '../entities/algorithm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Algorithm])],
  controllers: [AlgorithmController],
  providers: [AlgorithmService]
})
export class AlgorithmModule {}
