import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    Unique,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';
import { Chat } from './chat.entity';
import { User } from 'src/users/user.entity';

@Entity('chat_users')
@Unique(['chatId', 'userId'])
export class ChatUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    chatId: number;

    @Column()
    userId: number;

    @ManyToOne(() => Chat, (chat) => chat.users)
    @JoinColumn({ name: 'chatId' })
    chat: Chat;

    @ManyToOne(() => User, (user) => user.chats)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ default: 'member' })
    role: 'admin' | 'member';

    @CreateDateColumn()
    joinedAt: Date;
}
