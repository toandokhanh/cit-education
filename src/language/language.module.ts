import { Module } from '@nestjs/common';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from 'src/entitys/language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  controllers: [LanguageController],
  providers: [LanguageService]
})
export class LanguageModule {}
