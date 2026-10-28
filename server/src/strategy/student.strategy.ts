import { Injectable, BadRequestException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StudentStrategy extends PassportStrategy(Strategy, 'student') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
            algorithms: ['HS256'],
        });
    }

    async validate(payload: any) {
        if (payload.role === 'student') {
            return {
                userId: payload.id,
                email: payload.email,
                avatar: payload.avatart,
                fullname: payload.fullname,
                role: payload.role,
            };
        }
        throw new BadRequestException('Your role is not suitable', { cause: new Error(), description: 'This function is for students' });
    }
}
