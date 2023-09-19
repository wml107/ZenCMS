import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
    constructor(
        private readonly authService: AuthService
    ) { }
    //很麻烦的地方在于，nest的响应拦截器没有办法设置头信息，这样就不能在响应拦截器中刷新token了。
    //但如果在请求拦截器刷新token，这就意味着新token是先于业务的，可是有的业务本身就和token有关(例如让token过期)，所以在签发token的generateToken方法中，把签发日期手动延后三秒，营造出等同于后于业务的效果。
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>{
        let res = context.switchToHttp().getResponse();
        if(context.switchToHttp().getRequest().url === '/user/quit'){
            res.clearCookie("Authorization");
            return next
            .handle();
        }
        if(context.switchToHttp().getRequest().user !== undefined){
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