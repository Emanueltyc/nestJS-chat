import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn({ email, password }: AuthDto): Promise<AuthResponseDto> {
        const user = await this.usersService.findByEmail(email);

        const compare = await user?.comparePassword(password);
        if (!compare || !user) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user?.id, email: user?.email };
        return {
            user: new UserResponseDto(user),
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(dto: CreateUserDto): Promise<AuthResponseDto> {
        const user = await this.usersService.create(dto);

        const payload = { sub: user?.id, email: user?.email };
        return {
            user,
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
