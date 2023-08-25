import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from 'src/entitys/enrollment.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Enrollment])
    ]
})
export class EnrollmentModule {}
