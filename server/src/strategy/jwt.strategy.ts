import { ConfigService } from '@nestjs/config';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt' ){
    constructor(config: ConfigService)
    {
        super({
            //token string is added to every request(except login / register)
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
            algorithms: ['HS256']
        });
    }
    async validate(payload: any) {
        return {
            userId: payload.id,
            email: payload.email,
            avatar: payload.avatart,
            fullname: payload.fullname,
            role: payload.role,
        };
      }
    }
