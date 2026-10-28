import { JwtModule } from '@nestjs/jwt';
import { User } from '../entitys/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminStrategy } from '../strategy/admin.strategy';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { Course } from 'src/entitys/course.entity';
import { Blog } from 'src/entitys/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Course, Blog]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.getOrThrow<string>('JWT_SECRET');
        if (secret.length < 32) throw new Error('JWT_SECRET must have at least 32 characters');
        return { secret, signOptions: { expiresIn: '1h' as const } };
      },
    }),
  ],

  controllers: [UserController],
  providers: [UserService, JwtStrategy, AdminStrategy]
})
export class UserModule {}
