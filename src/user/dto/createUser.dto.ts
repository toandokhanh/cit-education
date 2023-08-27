import { Expose, Transform } from "class-transformer";

import { IsString, IsNotEmpty, IsDateString, IsIn, MinLength, IsOptional, IsEmail } from "class-validator";
import { BaseDto } from "src/common/base.dto";
// import { BaseDto } from "src/common/base.dto";



export class UserDTO extends BaseDto{
    // @IsNotEmpty()
    // userId: string;
    firstname : string;
    lastname : string;
    @Transform(({obj}) => obj.firstname + ' ' + obj.lastname)
    @Expose()   
    fullname : string;


    @IsNotEmpty()
    @IsEmail()
    @Expose()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @Expose()
    password: string;

    @IsNotEmpty()
    @IsIn(["male", "female", "other"])
    @Expose()
    gender: string;

    @IsOptional()
    @IsString()
    @Expose()
    avatar?: string;

    @IsOptional()
    @IsDateString()
    @Expose()
    dob: Date;
    
    @IsNotEmpty()
    @IsString()
    @Expose()
    @IsIn(["student", "instructor", "admin"]) // Các giá trị role hợp lệ
    role: string;

}
