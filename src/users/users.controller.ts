import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Query,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user-response.dto';
import { SearchResponseDto } from './dto/search-response.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SearchQueryDto } from './dto/search-query.dto';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async findAll(): Promise<UserResponseDto[]> {
        return this.usersService.findAll();
    }

    @Get('search')
    async search(
        @Query() { name, email, limit, offset }: SearchQueryDto,
    ): Promise<SearchResponseDto> {
        return this.usersService.search(name, email, limit, offset);
    }

    @Get(':id')
    async findByID(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<UserResponseDto> {
        return this.usersService.findByID(id);
    }
}
