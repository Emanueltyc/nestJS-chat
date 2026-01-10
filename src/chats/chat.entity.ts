import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ChatUser } from './chat-user.entity';
import { Message } from 'src/messages/message.entity';

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: false })
    isGroup: boolean;

    @OneToMany(() => ChatUser, (chatUser) => chatUser.chat)
    users: ChatUser[];

    @OneToMany(() => Message, (message) => message.chat)
    messages: Message[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
