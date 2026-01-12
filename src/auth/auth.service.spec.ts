import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
    let service: AuthService;
    let usersService: jest.Mocked<UsersService>;
    let jwtService: jest.Mocked<JwtService>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: {
                        create: jest.fn(),
                        findByEmail: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        signAsync: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = moduleRef.get(AuthService);
        usersService = moduleRef.get(UsersService);
        jwtService = moduleRef.get(JwtService);
    });

    it('should register an user and return a token', async () => {
        const dto = {
            name: 'User Test',
            email: 'test@test.com',
            password: '123456',
        };

        const mockDate = new Date();

        usersService.create.mockResolvedValue({
            id: '1',
            name: dto.name,
            email: dto.email,
            createdAt: mockDate,
        } as UserResponseDto);

        jwtService.signAsync.mockResolvedValue('jwt-token');

        const result = await service.register(dto);

        expect(usersService.create).toHaveBeenCalledWith(dto);
        expect(jwtService.signAsync).toHaveBeenCalledWith({
            sub: '1',
            email: dto.email,
        });

        expect(result).toEqual({
            user: {
                id: '1',
                name: dto.name,
                email: dto.email,
                createdAt: mockDate,
            },
            access_token: 'jwt-token',
        } as AuthResponseDto);
    });

    it('should login an user', async () => {
        const dto = {
            email: 'test@test.com',
            password: '123456',
        };

        const mockDate = new Date();

        const mockHashedPassword = await bcrypt.hash('123456', 10);

        const user = {
            id: 1,
            name: 'Test User',
            email: dto.email,
            password: mockHashedPassword,
            picture: '',
            createdAt: mockDate,
            updatedAt: mockDate,
        } as User;

        user.comparePassword = jest.fn().mockResolvedValue(true);

        usersService.findByEmail.mockResolvedValue(user);

        jwtService.signAsync.mockResolvedValue('jwt-token');

        const result = await service.signIn(dto);

        expect(usersService.findByEmail).toHaveBeenCalledWith(dto.email);
        expect(user.comparePassword).toHaveBeenCalledWith(dto.password);
        expect(jwtService.signAsync).toHaveBeenCalledWith({
            sub: 1,
            email: dto.email,
        });

        expect(result).toEqual({
            user: new UserResponseDto(user),
            access_token: 'jwt-token',
        } as AuthResponseDto);
    });
});
