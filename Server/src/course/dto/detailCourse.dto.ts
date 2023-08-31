import { IsNotEmpty, IsNumber } from "class-validator";

export class DetailCourseDto{
    @IsNumber()
    @IsNotEmpty()
    id : number;
}