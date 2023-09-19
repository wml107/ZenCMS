import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from "./auth.service";
import pkgJson from '../../package.json'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: pkgJson.secret,
    });
  }

  async validate(payload: any) {
    const temp = await this.authService.getUser(payload.id);
    let userInfo = {
      id: temp.id,
      username: temp.username,
      role: temp.role,
      claims: temp.role === 'super' ? [] : await this.authService.getClaims(payload.id),
      signDate: payload.signDate
    }
    return userInfo;
  }
}