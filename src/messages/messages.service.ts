import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MessageCreateDto } from './dto/message-create.dto';
import { Message } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageResponseDto } from './dto/fetch-response.dto';
import { ChatsService } from 'src/chats/chats.service';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private messagesRepository: Repository<Message>,
        private chatsService: ChatsService,
    ) {}

    save(dto: MessageCreateDto): Promise<Message> {
        return this.messagesRepository.save(dto);
    }

    async fetch(
        userId: number,
        chatId: number,
        limit: number = 100,
        offset: number = 0,
    ): Promise<MessageResponseDto> {
        const chats = await this.chatsService.findByUser(userId);

        if (!chats.find((c) => c.id == chatId))
            throw new UnauthorizedException(
                'User does not have access to the chat!',
            );

        limit = Math.min(limit, 100);

        const [messages, total] = await this.messagesRepository.findAndCount({
            where: { chatId: chatId },
            take: limit,
            skip: offset,
            order: { createdAt: 'ASC' },
            relations: ['chat'],
        });

        return new MessageResponseDto(messages, total, limit, offset);
    }
}
