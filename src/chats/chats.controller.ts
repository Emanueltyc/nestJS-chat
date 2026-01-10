import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatsService } from './chats.service';
import { ChatResponseDto } from './dto/chat-response.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('chats')
export class ChatsController {
    constructor(private chatsService: ChatsService) {}

    @Post()
    create(@Body() createChatDto: CreateChatDto): Promise<ChatResponseDto> {
        return this.chatsService.create(createChatDto);
    }

    @Get()
    async findByUser(@Request() req): Promise<ChatResponseDto[]> {
        return this.chatsService.findByUser(req['user'].sub);
    }
}
