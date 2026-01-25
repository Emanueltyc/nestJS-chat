import { Module } from '@nestjs/common';
import { Message } from './message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { AuthModule } from 'src/auth/auth.module';
import { MessagesController } from './messages.controller';
import { ChatsModule } from 'src/chats/chats.module';

@Module({
    imports: [TypeOrmModule.forFeature([Message]), AuthModule, ChatsModule],
    providers: [MessagesService],
    exports: [MessagesService],
    controllers: [MessagesController],
})
export class MessagesModule {}
