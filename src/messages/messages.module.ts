import { Module } from '@nestjs/common';
import { Message } from './message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { AuthModule } from 'src/auth/auth.module';
import { MessagesController } from './messages.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Message]), AuthModule],
    providers: [MessagesService],
    exports: [MessagesService],
    controllers: [MessagesController],
})
export class MessagesModule {}
