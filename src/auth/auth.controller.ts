import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() authDto: AuthDto): Promise<AuthResponseDto> {
        return this.authService.signIn(authDto);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    register(@Body() dto: CreateUserDto): Promise<AuthResponseDto> {
        return this.authService.register(dto);
    }
}
