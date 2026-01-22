import { Controller, Get, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageQueryDto } from './dto/message-query.dto';
import { MessageResponseDto } from './dto/fetch-response.dto';

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
