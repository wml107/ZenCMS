import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
    constructor(
        private readonly authService: AuthService
    ) { }
    
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>{
        if(context.switchToHttp().getRequest().user !== undefined){
            let res = context.switchToHttp().getResponse();
            //这里之所以重更新处理payload，就是因为这个位置有可能是刷新token，刷新token就已经存在一个旧jwt解析出来的payload，这里面包含类似exp的东西会导致无法用它生成新token，所以要把这些东西去掉。
            let userOld = context.switchToHttp().getRequest().user;
            let userNew = {
                id: userOld.id,
                username: userOld.username, 
                role: userOld.role,
                expire: userOld.expire,
                del: userOld.expire
            }
            res.cookie("Authorization", 
            "Bearer " + this.authService.generateToken(userNew).access_token, {
                maxAge: 12*60*60*1000 //半天过期
            });
        }
        return next
        .handle();
    } 
}