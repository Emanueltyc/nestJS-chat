import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async findAll(): Promise<UserResponseDto[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findByID(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<UserResponseDto> {
        return this.usersService.findByID(id);
    }
}
