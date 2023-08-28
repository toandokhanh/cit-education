import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { BaseDto } from "src/common/base.dto";

export class CreateLessonDTO extends BaseDto{
    @IsString()
    @IsNotEmpty()
    @Expose()
    title : string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    content: string;

}