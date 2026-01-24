import { Injectable, NotFoundException } from '@nestjs/common';
import { Socket } from 'socket.io';
import { MessageCreateDto } from 'src/messages/dto/message-create.dto';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatUser } from './chat-user.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatResponseDto } from './dto/chat-response.dto';

@Injectable()
export class ChatsService {
    constructor(
        @InjectRepository(Chat)
        private chatsRepository: Repository<Chat>,
        @InjectRepository(ChatUser)
        private chatUserRepository: Repository<ChatUser>,
    ) {}

    async create({
        name,
        isGroup,
        usersId,
    }: CreateChatDto): Promise<ChatResponseDto> {
        const chat = await this.chatsRepository.save({ name, isGroup });

        const chatUsers: ChatUser[] = [];

        for (const userId of usersId) {
            const chatUser = await this.chatUserRepository.save({
                chatId: chat.id,
                userId,
                role: 'member',
            });

            chatUsers.push(chatUser);
        }

        chat.users = chatUsers;

        return new ChatResponseDto(chat);
    }

    async findByUser(id: number): Promise<ChatResponseDto[]> {
        const chats = await this.chatsRepository
            .createQueryBuilder('chat')
            .innerJoin('chat.users', 'chatUserFilter')
            .where('chatUserFilter.userId = :id', { id })
            .leftJoinAndSelect('chat.users', 'chatUser')
            .leftJoinAndSelect('chatUser.user', 'user')
            .getMany();

        return chats.map((c) => new ChatResponseDto(c));
    }

    async getUsersByChatId(id: number): Promise<ChatUser[]> {
        return this.chatUserRepository.findBy({ chatId: id });
    }

    sendMessage(client: Socket, payload: MessageCreateDto) {
        client.emit('message', payload);
    }
}
