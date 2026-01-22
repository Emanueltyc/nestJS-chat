import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageQueryDto } from './dto/message-query.dto';
import { MessageResponseDto } from './dto/fetch-response.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('messages')
export class MessagesController {
    constructor(private messagesService: MessagesService) {}

    @Get()
    async fetch(
        @Query() { chatId, limit, offset }: MessageQueryDto,
    ): Promise<MessageResponseDto> {
        return this.messagesService.fetch(chatId, limit, offset);
    }
}
