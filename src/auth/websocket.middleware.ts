import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WebsocketMiddleware {
    constructor(private jwtService: JwtService) {}

    async use(socket: Socket, next: (err?: any) => void) {
        const token =
            socket.handshake.auth?.token ||
            socket.handshake.headers?.authorization?.split(' ')[1];

        if (!token) {
            return next(new Error('Unauthorized'));
        }

        try {
            const payload = await this.jwtService.verifyAsync(token);
            socket.data.userId = payload.sub;
            next();
        } catch (err: any) {
            next(new Error('Unauthorized'));
        }
    }
}
