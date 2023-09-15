import { AuthService } from "./auth.service";
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(username: string, password: string): Promise<{
        id: number;
        username: string;
        role: string;
        expire: number;
        del: number;
    }>;
}
export {};
