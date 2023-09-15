import { Reflector } from "@nestjs/core";
import { ExecutionContext } from "@nestjs/common";
import { AuthService } from "./auth.service";
declare const JwtAuthGard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGard extends JwtAuthGard_base {
    private reflector;
    private readonly authService;
    constructor(reflector: Reflector, authService: AuthService);
    canActivate(context: ExecutionContext): Promise<any>;
}
export {};
