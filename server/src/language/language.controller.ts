import { AuthGuard } from '@nestjs/passport';
import { LanguageService } from './language.service';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('language')
export class LanguageController {
    constructor(
        private languageService: LanguageService
    ){}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getCategorys(){
        return await this.languageService.getLanguages()
    }


}
