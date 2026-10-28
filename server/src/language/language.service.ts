import { Repository } from 'typeorm';
import { Language } from '../entities/language.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LanguageService {

    constructor(
        @InjectRepository(Language)
        private language : Repository<Language>
    ){}

    async getLanguages(){
        return await this.language.find()
    }

}
