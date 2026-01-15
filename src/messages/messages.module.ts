import { Module } from '@nestjs/common';
import { Message } from './message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Message]), AuthModule],
    providers: [MessagesService],
    exports: [MessagesService],
})
export class MessagesModule {}
