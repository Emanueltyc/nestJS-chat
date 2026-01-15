import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagesService } from 'src/messages/messages.service';
import { ChatsService } from 'src/chats/chats.service';
import { WebsocketMiddleware } from 'src/auth/websocket.middleware';
import { WebsocketPayloadDto } from './dto/websocket-payload.dto';

@UsePipes(
    new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }),
)
@WebSocketGateway()
export class WebsocketGateway {
    constructor(
        private messagesService: MessagesService,
        private chatsService: ChatsService,
        private websocketMiddleware: WebsocketMiddleware,
    ) {}

    @WebSocketServer()
    server: Server;

    onModuleInit() {
        this.server.use(
            this.websocketMiddleware.use.bind(this.websocketMiddleware),
        );
    }

    handleConnection(client: Socket) {
        console.log('Client connected:', client.id);
        client.join(client.data.userId.toString());
    }

    handleDisconnect(client: Socket) {
        console.log('Client disconnected:', client.id);
    }

    @SubscribeMessage('message')
    async handleMessage(
        @MessageBody()
        payload: WebsocketPayloadDto,
        @ConnectedSocket() client: Socket,
    ) {
        this.messagesService.save({ userId: client.data.userId, ...payload });

        const users = await this.chatsService.getUsersByChatId(payload.chatId);

        users
            .filter((u) => u.userId != client.data.userId)
            .forEach((u) =>
                client.in(u.userId.toString()).emit('message', payload),
            );
    }
}
