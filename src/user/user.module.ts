import { JwtModule } from '@nestjs/jwt';
import { User } from '../entitys/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { jwtConstants } from './constant/constant';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret :jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  
  controllers: [UserController],
  providers: [UserService, JwtStrategy]
})
export class UserModule {}
