import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
  
@Injectable()
export class UserTypeVerify {
    constructor(private jwtService: JwtService) {}

    private extractTokenFromHeader(request: Request): string | undefined {
        const access_token = request.headers?.access_token.toString();
        return access_token || undefined;
    }

    async getUserTypeByToken(request): Promise<any> {
        const access_token = this.extractTokenFromHeader(request);
        const payload = await this.jwtService.verifyAsync( access_token, { secret: process.env.JWT_CONSTANT_SECRET });
        request['user'] = payload;
        return request.user;
    }
}