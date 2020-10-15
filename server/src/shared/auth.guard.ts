import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (!request.headers.authorization) {
            return false;
        }

        this.validateToken(request.headers.authorization);

        return true;
    }

    async validateToken(auth: string) {
        if (auth.split('')[0] !== 'Bearer') {
            //TODO: HttpException

        }
        const token = auth.split('')[1];
        try {
            const decode = jwt.verify(token, process.env.SECRET);
        } catch (err) {
            const messate = 'Token error: ' + (err.message || err.name)
            //throw new HttpException(message, HttpStatus.FORBIDDEN);
        }

    }

}

