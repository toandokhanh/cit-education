import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from 'src/entitys/video.entity';
import { Language } from 'src/entitys/language.entity';
import { Algorithm } from 'src/entitys/algorithm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video, Language, Algorithm])],
  controllers: [VideoController],
  providers: [VideoService]
})
export class VideoModule {}
