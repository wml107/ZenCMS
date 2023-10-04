import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtAuthGard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector,
    private readonly authService: AuthService) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>("isPublic", [
      context.getHandler(),
      context.getClass(),
    ]);
    const claim = this.reflector.getAllAndOverride<string>("claim", [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    let res;
    try {
      //确认jwt有效
      res = await super.canActivate(context);
      if (!res) return res;
      //确保token没有(因退出登录、修改密码导致的)过期
      const { id, signDate } = context.switchToHttp().getRequest().user;
      if (await this.authService.isExpire(id, signDate)) throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
      //根据username获取其角色
      const roleId = (await this.authService.getUser(id)).role;
      //根据角色获取其具备权限,
      //如果不需要什么特别的权限(claim为undefined)或者用户为超管那就直接返回成功
      if (roleId === 0 || claim === undefined) return true;
      const role = await this.authService.getRole(roleId)
      const claims = (role === false ? false : role.claims)
      //角色查不到要报错
      if (!claims) throw new HttpException("role does not exist", HttpStatus.FORBIDDEN);
      for (let i = 0; i < claims.length; i++)if (claims[i] === claim) return true;
      return false;
    } catch (err) {
      if (err.response === "role does not exist") throw new HttpException("role does not exist", HttpStatus.FORBIDDEN);
      if (err.response === "Unauthorized") throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);

      //这里抛的是上面super.canActivate()的异常，也就是jwt无效、缺失的情形。如果不用这种方式抛，他会作为一个系统内部异常被抛出，而不是Http异常。
      throw new HttpException(err.response.message, err.response.statusCode);
    }
  }
}