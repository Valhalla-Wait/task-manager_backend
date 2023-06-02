import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import {Observable} from "rxjs"
import { AuthError } from "src/exceptions/auth.error";
import { TokenService } from "src/token/token.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private tokenService: TokenService) {

    }

    canActivate(context: ExecutionContext):boolean | Promise<boolean> | Observable<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        try{
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            

            if(bearer !== 'Bearer' || !token) {
                AuthError.UnauthorizedError()
            }

            const user = this.tokenService.validateAcceessToken(token)

            req.user = user
            return true
        }catch(e) {
            AuthError.UnauthorizedError()
        }
    }
}