import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { Message } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private messagesRepository: Repository<Message>,
    ) {}

    save(dto: MessageDto): Promise<Message> {
        return this.messagesRepository.save(dto);
    }
}
