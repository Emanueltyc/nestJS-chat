import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserResponseDto } from './dto/user-response.dto';
import { SearchResponseDto } from './dto/search-response.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(dto: CreateUserDto): Promise<UserResponseDto> {
        if (await this.findByEmail(dto.email)) {
            throw new BadRequestException('Email already in use');
        }

        const user = this.usersRepository.create({ ...dto });
        await this.usersRepository.save(user);

        return new UserResponseDto(user);
    }

    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.usersRepository.find();
        return users.map((user: User) => new UserResponseDto(user));
    }

    async findByID(id: number): Promise<UserResponseDto> {
        const user = await this.usersRepository.findOneBy({ id: id });

        if (user) {
            return new UserResponseDto(user);
        }

        throw new NotFoundException('User not found');
    }

    async search(
        name?: string,
        email?: string,
        limit: number = 10,
        offset: number = 0,
    ): Promise<SearchResponseDto> {
        const qb = this.usersRepository.createQueryBuilder('user');

        name &&
            qb.andWhere('user.name ILIKE :name', {
                name: `%${name}%`,
            });

        email &&
            qb.andWhere('user.email = :email', {
                email: email,
            });

        const [users, total] = await qb
            .take(limit)
            .skip(offset)
            .getManyAndCount();

        return new SearchResponseDto(users, total, limit, offset);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.usersRepository.findOneBy({ email: email });

        return user;
    }
}
