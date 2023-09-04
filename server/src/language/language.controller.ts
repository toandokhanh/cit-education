import { LanguageService } from './language.service';
import { Controller, Get } from '@nestjs/common';

@Controller('language')
export class LanguageController {
    constructor(
        private languageService: LanguageService
    ){}

    @Get()
    async getCategorys(){
        return await this.languageService.getLanguages()
    }


}
