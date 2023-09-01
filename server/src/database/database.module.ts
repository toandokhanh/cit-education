import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
           useFactory:(configService : ConfigService) => ({
                type: 'postgres',
                host: 'localhost',
                port: configService.getOrThrow('PORT'),
                username: configService.getOrThrow('DB_USERNAME'),
                password: configService.getOrThrow('DB_PASSWORD'),
                database: configService.getOrThrow('DB_NAME'),
                autoLoadEntities: true,
                // entities: ['dist/**/*.entity{.ts,.js}'],
                // synchronize: false,
                synchronize: true,
                // retryDelay: 3000,
                // retryAttempts: 10,
           }),
           inject: [ConfigService],
        }),
    ]
})
export class DatabaseModule {}
