import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { ChatUser } from './chat-user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Chat, ChatUser])],
    providers: [ChatsService],
    controllers: [ChatsController],
    exports: [ChatsService],
})
export class ChatsModule {}
