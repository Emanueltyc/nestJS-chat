import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn({ email, password }: AuthDto): Promise<any> {
        const user = await this.usersService.findByEmail(email);

        const compare = await user?.comparePassword(password);
        if (!compare) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user?.id, email: user?.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
