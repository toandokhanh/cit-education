import { Category } from '../entitys/catetory.entity';
import { Module } from '@nestjs/common';
import { CatetoryService } from './catetory.service';
import { CatetoryController } from './catetory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category])
  ],
  providers: [CatetoryService],
  controllers: [CatetoryController]
})
export class CatetoryModule {}
