import { Injectable, BadRequestException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from '../user/constant/constant';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        if (payload.role === 'admin') {
            return { 
                userId: payload.id, 
                email: payload.email, 
                avatar: payload.avatart, 
                fullname: payload.fullname, 
                role: payload.role, 
            };
        }
        throw new BadRequestException('Your role is not suitable', { cause: new Error(), description: 'This function is for Admins' });
    }
}
