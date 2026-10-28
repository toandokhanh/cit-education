import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
           useFactory:(configService : ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST', '127.0.0.1'),
                port: Number(configService.get('DB_PORT', '5432')),
                username: configService.getOrThrow('DB_USERNAME'),
                password: configService.getOrThrow('DB_PASSWORD'),
                database: configService.getOrThrow('DB_NAME'),
                autoLoadEntities: true,
                // entities: ['dist/**/*.entity{.ts,.js}'],
                // synchronize: false,
                synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
                // retryDelay: 3000,
                // retryAttempts: 10,
           }),
           inject: [ConfigService],
        }),
    ]
})
export class DatabaseModule {}
