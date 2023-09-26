import { jwtConstants } from '../user/constant/constant';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt' ){
    constructor()
    {
        super({
            //token string is added to every request(except login / register)
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),      
            secretOrKey: jwtConstants.secret
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