import { Injectable } from '@nestjs/common';
import { MessageCreateDto } from './dto/message-create.dto';
import { Message } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageResponseDto } from './dto/fetch-response.dto';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private messagesRepository: Repository<Message>,
    ) {}

    save(dto: MessageCreateDto): Promise<Message> {
        return this.messagesRepository.save(dto);
    }

    async fetch(
        chatId: number,
        limit: number = 100,
        offset: number = 0,
    ): Promise<MessageResponseDto> {
        limit = Math.min(limit, 100);

        const [messages, total] = await this.messagesRepository.findAndCount({
            where: { chatId: chatId },
            take: limit,
            skip: offset,
            order: { createdAt: 'ASC' },
        });

        return new MessageResponseDto(messages, total, limit, offset);
    }
}
