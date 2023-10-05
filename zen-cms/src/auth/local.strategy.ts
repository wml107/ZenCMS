import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        //注意，passport-local策略，对于所有password为空的情况下会之间返回密码错误，也就是说他不支持密码为空的情形，原生就不支持。我找了nest、passportjs的文档，都没有找到放开的选项。
        super();
    }
    async validate(username: string, password: string) {
        const user = await this.authService.validateUser(username, password);
        if (!user) throw new UnauthorizedException();
        return user;
    }
}