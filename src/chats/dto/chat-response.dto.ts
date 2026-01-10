import { Chat } from '../chat.entity';

export class ChatResponseDto {
    id: number;
    name: string;
    users: userChatDto[];
    createdAt: Date;

    constructor(chat: Chat) {
        this.id = chat.id;
        this.name = chat.name;
        this.users = chat.users.map(({ id, role, joinedAt }) => {
            return { id, role, joinedAt };
        });
        this.createdAt = chat.createdAt;
    }
}

interface userChatDto {
    id: number;
    role: string;
    joinedAt: Date;
}
