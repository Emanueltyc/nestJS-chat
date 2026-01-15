import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { WebsocketMiddleware } from './websocket.middleware';

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            global: true,
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: '1d',
                },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, WebsocketMiddleware],
    exports: [WebsocketMiddleware],
})
export class AuthModule {}
