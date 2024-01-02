import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
  
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const access_token = this.extractTokenFromHeader(request);
        if (!access_token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync( access_token, { secret: process.env.JWT_CONSTANT_SECRET });
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const access_token = request.headers?.access_token.toString();
        return access_token || undefined;
    }
}