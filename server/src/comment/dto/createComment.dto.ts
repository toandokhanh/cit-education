import { Expose, Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { BaseDto } from "src/common/base.dto";

export class CreateCommentDto extends BaseDto{
    @IsString()
    @IsNotEmpty()
    @Expose()
    content: string;

    @Expose()
    @Transform(({ value }) => value) 
    user: number;
} 