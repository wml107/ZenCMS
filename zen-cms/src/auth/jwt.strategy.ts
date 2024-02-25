import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from "./auth.service";
import Config from '../utils/Config';

const config = new Config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getConfig('TOKEN_SECRET'),
    });
  }

  async validate(payload: any) {
    const temp = await this.authService.getUser(payload.id);
    const temp2 = await this.authService.getRole(temp.role);
    let userInfo = {
      id: temp.id,
      username: temp.username,
      role: temp.role,
      rolename: temp.role === 0 ? 'super' : (temp2 !== false ? temp2.rolename : false),
      claims: temp.role === 0 ? [] : (temp2 !== false ? temp2.claims : false),
      signDate: payload.signDate
    }
    return userInfo;
  }
}